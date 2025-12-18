import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function WindSpeedChart({ data }) {
    return (
        <div>
            <h4 className="text-sm font-medium text-white/80 mb-3">
                Kecepatan Angin (km/h)
            </h4>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
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
                    <Bar
                        dataKey="windSpeed"
                        fill="#10b981"
                        name="Angin (km/h)"
                        isAnimationActive={false}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
