import { useState } from "react";
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

import dashboardData from "../data/dashboard.json";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("incidents");

  const renderContent = () => {
    switch (activeTab) {
      case "trends":
        return <TrendInsights data={dashboardData.trend} />;

      case "devices":
        return <DeviceInsights />;

      case "causes":
        return <CauseInsights />;

      case "reports":
        return <Reports />;

      default:
        return <IncidentTable data={dashboardData.incidents} />;
    }
  };

  return (
    <div className="dashboard-layout">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="dashboard-main">

        {/* Header + Filters */}

        <Header />

        {/* KPI Cards */}

        <section className="stats-grid">
          {dashboardData.stats.map((item, index) => (
            <StatCard
              key={index}
              stat={item}
            />
          ))}
        </section>

        {/* Charts */}

        <section className="charts-grid">

          <div className="chart-card trend-card">

            <div className="card-header">
              <h3>Incident Trend</h3>
              <button className="view-btn">
                View Details
              </button>
            </div>

            <TrendChart data={dashboardData.trend} />

          </div>

          <div className="chart-card">

            <div className="card-header">
              <h3>Incident Status</h3>
            </div>

            <DonutChart
              data={dashboardData.status}
              colors={["#FF9800", "#22C55E", "#8B5CF6"]}
            />

          </div>

          <div className="chart-card">

            <div className="card-header">
              <h3>Incident Priority</h3>
            </div>

            <DonutChart
              data={dashboardData.priority}
              colors={["#EF4444", "#F97316", "#EAB308", "#3B82F6"]}
            />

          </div>

        </section>

        {/* Bottom Section */}

        <section className="content-section">

          <div className="content-body">
            {renderContent()}
          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;