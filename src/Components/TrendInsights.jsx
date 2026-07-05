import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function TrendInsights({ data }) {
    return (
        <div className="content-card">

            <div className="section-header">

                <h2>Trend Insights</h2>

            </div>

            <ResponsiveContainer
                width="100%"
                height={450}
            >

                <AreaChart data={data}>

                    <CartesianGrid stroke="#eee" />

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#ff9800"
                        fill="#FFE5C2"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>
    );
}

export default TrendInsights;