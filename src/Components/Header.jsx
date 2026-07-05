import {
    FiBell,
    FiRefreshCw,
    FiCalendar,
    FiPlus,
} from "react-icons/fi";

function Header() {
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

                        <input type="date" />

                    </div>

                </div>

                <div className="date-group">

                    <label>To</label>

                    <div className="input-box">

                        <FiCalendar />

                        <input type="date" />

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

                <button className="add-filter-btn">

                    <FiPlus />

                    Add Filter

                </button>

            </div>

        </section>
    );
}

export default Header;