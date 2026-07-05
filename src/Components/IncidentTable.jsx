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

            const matchSearch =
                item.summary.toLowerCase().includes(search.toLowerCase()) ||
                item.location.toLowerCase().includes(search.toLowerCase());

            const matchStatus =
                status === "All" || item.status === status;

            const matchPriority =
                priority === "All" ||
                item.priority === priority;

            return matchSearch && matchStatus && matchPriority;
        });

    }, [data, search, status, priority]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

    const current = filtered.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );

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

                <div className="search-box">

                    <FiSearch />

                    <input
                        placeholder="Search Incident..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >

                    <option>All</option>
                    <option>Open</option>
                    <option>Resolved</option>
                    <option>Transferred</option>

                </select>

                <select
                    value={priority}
                    onChange={(e) =>
                        setPriority(e.target.value)
                    }
                >

                    <option>All</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>

                </select>

                <button
                    className="export-btn"
                    onClick={exportExcel}
                >
                    <FiDownload />
                    Export Excel
                </button>

            </div>

            {/* Table */}

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

                    {current.map((item) => (

                        <tr key={item.id}>

                            <td>{item.id}</td>

                            <td>{item.opened}</td>

                            <td>{item.resolved}</td>

                            <td>{item.location}</td>

                            <td>{item.summary}</td>

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

                    Page {page} of {totalPages}

                </span>

                <button
                    disabled={page === totalPages}
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