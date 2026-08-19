import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FiDownload, FiSearch } from "react-icons/fi";

const PAGE_SIZE = 8;

function IncidentTable({ data }) {

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");

    const [priority, setPriority] = useState("All");

    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {

        return data.filter((item) => {

            const searchTerm = search.toLowerCase();
            const matchSearch = [item.id, item.summary, item.location, item.service]
                .some((value) => String(value || "").toLowerCase().includes(searchTerm));

            const matchStatus =
                status === "All" || item.status === status;

            const matchPriority =
                priority === "All" ||
                item.priority === priority;

            return matchSearch && matchStatus && matchPriority;
        });

    }, [data, search, status, priority]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

    const pageCount = Math.max(totalPages, 1);

    const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const resetPage = () => setPage(1);

    const exportExcel = () => {

        const sheet = XLSX.utils.json_to_sheet(filtered);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            sheet,
            "Incidents"
        );

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer]);

        saveAs(blob, "Incidents.xlsx");
    };

    const badge = (value) => {
        return value.toLowerCase().replace(" ", "-");
    };

    return (
        <div className="table-card">

            {/* Toolbar */}

            <div className="table-toolbar">

                <div className="table-tools-left">
                    <div className="search-box">

                        <FiSearch />

                        <input
                            placeholder="Search by ID, summary, or team"
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                resetPage();
                            }}
                        />

                    </div>

                    <select
                        className="filter-select"
                        value={status}
                        onChange={(event) => {
                            setStatus(event.target.value);
                            resetPage();
                        }}
                    >

                        <option value="All">All statuses</option>
                        <option>Open</option>
                        <option>Resolved</option>
                        <option>Transferred</option>

                    </select>

                    <select
                        className="filter-select"
                        value={priority}
                        onChange={(event) => {
                            setPriority(event.target.value);
                            resetPage();
                        }}
                    >

                        <option value="All">All priorities</option>
                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>

                    </select>
                </div>

                <div className="table-tools-right">
                    <span className="table-count">{filtered.length} records</span>
                    <button className="export-btn" onClick={exportExcel}>
                        <FiDownload />
                        Export Excel
                    </button>
                </div>

            </div>

            {/* Table */}

            <div className="table-wrapper">
            <table className="incident-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Opened</th>

                        <th>Resolved</th>

                        <th>Location</th>

                        <th>Summary</th>

                        <th>CI</th>

                        <th>Service</th>

                        <th>Priority</th>

                        <th>Status</th>

                        <th>Transferred</th>

                        <th>Transfer Reason</th>

                    </tr>

                </thead>

                <tbody>

                    {current.length === 0 ? (
                        <tr>
                            <td className="table-empty" colSpan="11">
                                No incidents match the current filters.
                            </td>
                        </tr>
                    ) : current.map((item) => (

                        <tr key={item.id}>

                            <td>{item.id}</td>

                            <td>{item.opened}</td>

                            <td>{item.resolved}</td>

                            <td>{item.location}</td>

                            <td title={item.summary}>{item.summary}</td>

                            <td>{item.ci}</td>

                            <td>{item.service}</td>

                            <td>

                                <span className={`badge ${badge(item.priority)}`}>

                                    {item.priority}

                                </span>

                            </td>

                            <td>

                                <span className={`badge ${badge(item.status)}`}>

                                    {item.status}

                                </span>

                            </td>

                            <td>{item.transferred}</td>

                            <td>{item.transferReason}</td>

                        </tr>

                    ))}

                </tbody>

            </table>
            </div>

            {/* Pagination */}

            <div className="pagination">

                <button
                    disabled={page === 1}
                    onClick={() =>
                        setPage(page - 1)
                    }
                >
                    Prev
                </button>

                <span>

                    Page {page} of {pageCount}

                </span>

                <button
                    disabled={page >= pageCount}
                    onClick={() =>
                        setPage(page + 1)
                    }
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default IncidentTable;