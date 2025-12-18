import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function HumidityChart({ data }) {
    return (
        <div className="mb-8">
            <h4 className="text-sm font-medium text-white/80 mb-3">
                Kelembapan (%)
            </h4>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                        dataKey="time"
                        stroke="#94a3b8"
                        style={{ fontSize: "11px" }}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        style={{ fontSize: "11px" }}
                        domain={[0, 100]}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Kelembapan (%)"
                        dot={{ fill: "#3b82f6", r: 3 }}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
