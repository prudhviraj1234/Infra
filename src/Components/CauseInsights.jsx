const causes = [
    {
        cause: "Network Failure",
        incidents: 214,
    },
    {
        cause: "Hardware Failure",
        incidents: 172,
    },
    {
        cause: "Power Issue",
        incidents: 92,
    },
    {
        cause: "Configuration Error",
        incidents: 118,
    },
    {
        cause: "Database Issue",
        incidents: 76,
    },
];

function CauseInsights() {
    return (
        <div className="content-card">

            <h2>Root Cause Analysis</h2>

            <table className="incident-table">

                <thead>

                    <tr>

                        <th>Cause</th>

                        <th>Total Incidents</th>

                    </tr>

                </thead>

                <tbody>

                    {causes.map((item, index) => (

                        <tr key={index}>

                            <td>{item.cause}</td>

                            <td>{item.incidents}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default CauseInsights;