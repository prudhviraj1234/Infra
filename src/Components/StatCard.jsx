import {
    FiFileText,
    FiAlertTriangle,
    FiCheckCircle,
    FiArrowRightCircle,
    FiClock,
} from "react-icons/fi";

const icons = {
    "Total Incidents": FiFileText,
    "Open Incidents": FiAlertTriangle,
    "Resolved": FiCheckCircle,
    "Transferred": FiArrowRightCircle,
    MTTR: FiClock,
};

function StatCard({ stat }) {
    const Icon = icons[stat.title];

    return (
        <div className="stat-card">

            <div
                className="stat-icon"
                style={{
                    background: stat.bgColor,
                    color: stat.iconColor,
                }}
            >
                <Icon size={28} />
            </div>

            <div className="stat-details">

                <p>{stat.title}</p>

                <h2>{stat.value}</h2>

            </div>

        </div>
    );
}

export default StatCard;