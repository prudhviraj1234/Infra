import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
} from "recharts";

const data = [
    {
        name: "Servers",
        value: 420,
    },
    {
        name: "Routers",
        value: 180,
    },
    {
        name: "Switches",
        value: 290,
    },
    {
        name: "Firewalls",
        value: 120,
    },
];

const colors = [
    "#FF9800",
    "#3B82F6",
    "#22C55E",
    "#8B5CF6",
];

function DeviceInsights() {
    return (
        <div className="content-card">

            <h2>Device Distribution</h2>

            <ResponsiveContainer
                width="100%"
                height={450}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={150}
                    >

                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={colors[index]}
                            />
                        ))}

                    </Pie>

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
}

export default DeviceInsights;