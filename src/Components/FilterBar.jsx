import { FiCalendar, FiPlus } from "react-icons/fi";

function FilterBar() {
    return (
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
    );
}

export default FilterBar;