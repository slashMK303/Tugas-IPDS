import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function TemperatureChart({ data }) {
    return (
        <div className="mb-8">
            <h4 className="text-sm font-medium text-white/80 mb-3">
                Suhu (°C)
            </h4>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                        dataKey="time"
                        stroke="#94a3b8"
                        style={{ fontSize: "11px" }}
                    />
                    <YAxis stroke="#94a3b8" style={{ fontSize: "11px" }} />
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
                        dataKey="temperature"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        name="Suhu (°C)"
                        dot={{ fill: "#f59e0b", r: 3 }}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
