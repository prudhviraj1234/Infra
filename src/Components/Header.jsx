import {
    FiBell,
    FiRefreshCw,
    FiCalendar,
} from "react-icons/fi";

function Header({ fromDate, toDate, onFromDateChange, onToDateChange }) {
    return (
        <section className="dashboard-header">

            {/* Row 1 */}

            <div className="header-top">

                <div>

                    <h1>Infrastructure Issue Trend Tracker</h1>

                    <p>
                        Monitor enterprise infrastructure incidents and operational health.
                    </p>

                </div>

                <div className="header-actions">

                    <button className="icon-button">
                        <FiBell />
                    </button>

                    <button className="icon-button">
                        <FiRefreshCw />
                    </button>

                    <div className="auto-refresh">

                        <span className="green-dot"></span>

                        Auto Refresh ON

                    </div>

                </div>

            </div>

            {/* Row 2 */}

            <div className="filter-row">

                <div className="date-group">

                    <label>From</label>

                    <div className="input-box">

                        <FiCalendar />

                        <input
                            type="date"
                            value={fromDate}
                            onChange={(event) => onFromDateChange(event.target.value)}
                        />

                    </div>

                </div>

                <div className="date-group">

                    <label>To</label>

                    <div className="input-box">

                        <FiCalendar />

                        <input
                            type="date"
                            value={toDate}
                            onChange={(event) => onToDateChange(event.target.value)}
                        />

                    </div>

                </div>

                <div className="dropdown-group">

                    <label>Location</label>

                    <select>

                        <option>Global</option>
                        <option>India</option>
                        <option>USA</option>
                        <option>Europe</option>

                    </select>

                </div>

            </div>

        </section>
    );
}

export default Header;