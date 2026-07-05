import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

function DonutChart({ data, colors }) {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                >

                    {data.map((item, index) => (
                        <Cell
                            key={index}
                            fill={colors[index]}
                        />
                    ))}

                </Pie>

                <Tooltip />

                <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                />

            </PieChart>
        </ResponsiveContainer>
    );
}

export default DonutChart;