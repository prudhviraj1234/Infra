import IncidentTable from "./IncidentTable";
import TrendInsights from "./TrendInsights";
import DeviceInsights from "./DeviceInsights";
import CauseInsights from "./CauseInsights";
import Reports from "./Reports";

function ContentArea({ activeTab, data }) {
    switch (activeTab) {
        case "dashboard":
        case "incidents":
            return <IncidentTable data={data.incidents} />;

        case "trends":
            return <TrendInsights data={data.trend} />;

        case "devices":
            return <DeviceInsights />;

        case "causes":
            return <CauseInsights />;

        case "reports":
            return <Reports />;

        default:
            return <IncidentTable data={data.incidents} />;
    }
}

export default ContentArea;