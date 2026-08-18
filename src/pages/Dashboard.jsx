import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import TrendChart from "../components/TrendChart";
import DonutChart from "../components/DonutChart";
import IncidentTable from "../components/IncidentTable";
import TrendInsights from "../components/TrendInsights";
import DeviceInsights from "../components/DeviceInsights";
import CauseInsights from "../components/CauseInsights";
import Reports from "../components/Reports";

const API_URL =
  "http://pla-w@ligni02:3010/service/handover/incident/?group=MS%20SQL%20Database%20L2";

const EMPTY_DASHBOARD = {
  stats: [],
  trend: [],
  status: [],
  priority: [],
  incidents: [],
};

const normalizePriority = (priority = "") => {
  const value = String(priority).trim();
  const match = value.match(/^(\d+\s*)?(.*)$/i);

  if (match && match[2]) {
    return match[2].trim();
  }

  return value || "Low";
};

const normalizeStatus = (status = "") => {
  const value = String(status).trim();

  if (!value) return "Open";
  const lower = value.toLowerCase();

  if (lower.includes("hold")) return "Open";
  if (lower.includes("close") || lower.includes("resolve")) return "Resolved";
  if (lower.includes("transfer")) return "Transferred";

  return value;
};

const normalizeIncident = (incident) => ({
  id: incident.number || incident.id || "-",
  opened: incident.created_at || "-",
  resolved: incident.resolved_at || "-",
  location: incident.group || "N/A",
  summary: incident.title || incident.description || "No title",
  ci: incident.parent || incident.group || "-",
  service: incident.group || "N/A",
  priority: normalizePriority(incident.priority),
  device: incident.assignee || "N/A",
  cause: incident.problem || "-",
  status: normalizeStatus(incident.state),
  transferred: "No",
  transferReason: "-",
});

const buildStatusChart = (incidents) => {
  const counts = { Open: 0, Resolved: 0, Transferred: 0 };

  incidents.forEach((incident) => {
    const status = normalizeStatus(incident.status);
    if (status === "Resolved") counts.Resolved += 1;
    else if (status === "Transferred") counts.Transferred += 1;
    else counts.Open += 1;
  });

  return [
    { name: "Open", value: counts.Open },
    { name: "Resolved", value: counts.Resolved },
    { name: "Transferred", value: counts.Transferred },
  ];
};

const buildPriorityChart = (incidents) => {
  const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };

  incidents.forEach((incident) => {
    const priority = normalizePriority(incident.priority).toLowerCase();

    if (priority.includes("critical")) counts.Critical += 1;
    else if (priority.includes("high")) counts.High += 1;
    else if (priority.includes("medium")) counts.Medium += 1;
    else counts.Low += 1;
  });

  return [
    { name: "Critical", value: counts.Critical },
    { name: "High", value: counts.High },
    { name: "Medium", value: counts.Medium },
    { name: "Low", value: counts.Low },
  ];
};

const buildTrendChart = (incidents) => {
  const dateMap = new Map();

  incidents.forEach((incident) => {
    const opened = incident.created_at || "";
    if (!opened) return;

    const date = opened.split(" ")[0];
    dateMap.set(date, (dateMap.get(date) || 0) + 1);
  });

  return [...dateMap.entries()].slice(-10).map(([day, value]) => ({ day, value }));
};

const buildStats = (incidents) => {
  const open = incidents.filter((incident) => normalizeStatus(incident.state) !== "Resolved").length;
  const resolved = incidents.filter((incident) => normalizeStatus(incident.state) === "Resolved").length;

  return [
    {
      title: "Total Incidents",
      value: incidents.length,
      iconColor: "#F97316",
      bgColor: "rgba(249,115,22,.15)",
    },
    {
      title: "Open Incidents",
      value: open,
      iconColor: "#EAB308",
      bgColor: "rgba(234,179,8,.15)",
    },
    {
      title: "Resolved",
      value: resolved,
      iconColor: "#EF4444",
      bgColor: "rgba(239,68,68,.15)",
    },
    {
      title: "Transferred",
      value: 0,
      iconColor: "#8B5CF6",
      bgColor: "rgba(139,92,246,.15)",
    },
    {
      title: "MTTR",
      value: "N/A",
      iconColor: "#3B82F6",
      bgColor: "rgba(59,130,246,.15)",
    },
  ];
};

function Dashboard() {
  const [activeTab, setActiveTab] = useState("incidents");
  const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);

  useEffect(() => {
    let isMounted = true;

    const fetchIncidents = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          mode: "cors",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const incidents = Array.isArray(data) ? data.map(normalizeIncident) : [];

        if (isMounted) {
          setDashboard({
            stats: buildStats(incidents),
            trend: buildTrendChart(incidents),
            status: buildStatusChart(incidents),
            priority: buildPriorityChart(incidents),
            incidents,
          });
        }
      } catch (error) {
        console.error("Unable to load incidents from API", error);
        if (isMounted) {
          setDashboard(EMPTY_DASHBOARD);
        }
      }
    };

    fetchIncidents();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "trends":
        return <TrendInsights data={dashboard.trend} />;

      case "devices":
        return <DeviceInsights />;

      case "causes":
        return <CauseInsights />;

      case "reports":
        return <Reports />;

      default:
        return <IncidentTable data={dashboard.incidents} />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="dashboard-main">
        <Header />

        <section className="stats-grid">
          {dashboard.stats.map((item, index) => (
            <StatCard key={index} stat={item} />
          ))}
        </section>

        <section className="charts-grid">
          <div className="chart-card trend-card">
            <div className="card-header">
              <h3>Incident Trend</h3>
              <button className="view-btn">View Details</button>
            </div>

            <TrendChart data={dashboard.trend} />
          </div>

          <div className="chart-card">
            <div className="card-header">
              <h3>Incident Status</h3>
            </div>

            <DonutChart
              data={dashboard.status}
              colors={["#FF9800", "#22C55E", "#8B5CF6"]}
            />
          </div>

          <div className="chart-card">
            <div className="card-header">
              <h3>Incident Priority</h3>
            </div>

            <DonutChart
              data={dashboard.priority}
              colors={["#EF4444", "#F97316", "#EAB308", "#3B82F6"]}
            />
          </div>
        </section>

        <section className="content-section">
          <div className="content-body">{renderContent()}</div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;