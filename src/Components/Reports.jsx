import {
    FiDownload,
    FiFileText,
    FiBarChart2,
} from "react-icons/fi";

function Reports() {
    return (
        <div className="content-card">

            <h2>Available Reports</h2>

            <div className="report-grid">

                <div className="report-card">

                    <FiFileText size={35} />

                    <h3>Incident Report</h3>

                    <button>Download</button>

                </div>

                <div className="report-card">

                    <FiBarChart2 size={35} />

                    <h3>Monthly Analytics</h3>

                    <button>Download</button>

                </div>

                <div className="report-card">

                    <FiDownload size={35} />

                    <h3>Device Health</h3>

                    <button>Download</button>

                </div>

            </div>

        </div>
    );
}

export default Reports;