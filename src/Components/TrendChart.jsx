import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

function TrendChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
                <CartesianGrid stroke="#f1f1f1" />

                <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12 }}
                />

                <YAxis tick={{ fontSize: 12 }} />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ff8c00"
                    strokeWidth={3}
                    dot={{
                        r: 4,
                        fill: "#ff8c00",
                    }}
                    activeDot={{
                        r: 7,
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default TrendChart;