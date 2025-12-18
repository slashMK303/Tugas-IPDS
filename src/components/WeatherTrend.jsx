import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

export default function WeatherTrend() {
    const [latestData, setLatestData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [lastUpdate, setLastUpdate] = useState("");

    useEffect(() => {
        fetchWeatherData();
        // Auto-refresh setiap 5 menit (sesuai GitHub Actions schedule)
        const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchWeatherData = async () => {
        try {
            setError("");

            // Fetch CSV from GitHub raw content
            const response = await fetch(
                "https://raw.githubusercontent.com/slashMK303/Tugas-IPDS/main/data/weather_data_solo.csv"
            );

            if (!response.ok) {
                throw new Error("Data belum tersedia");
            }

            const csvText = await response.text();
            const parsedData = parseCSV(csvText);

            if (parsedData.length === 0) {
                throw new Error("Data kosong");
            }

            // Get latest data point
            const latest = parsedData[parsedData.length - 1];
            setLatestData(latest);

            // Take last 12 records for chart visualization
            const recentData = parsedData.slice(-12);
            setChartData(recentData);
            setLastUpdate(new Date().toLocaleTimeString("id-ID"));
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const parseCSV = (csvText) => {
        const lines = csvText.trim().split("\n");
        const headers = lines[0].split(",");

        return lines.slice(1).map((line) => {
            const values = line.split(",");
            const record = {};

            headers.forEach((header, index) => {
                record[header.trim()] = values[index]?.trim();
            });

            // Format for chart display
            return {
                time: new Date(record.timestamp).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                temperature: parseFloat(record.temperature_c),
                humidity: parseFloat(record.humidity_percent),
                windSpeed: parseFloat(record.wind_speed_kmh),
            };
        });
    };

    if (loading) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    📊 Trend Cuaca Solo
                </h2>
                <p className="text-white/60">Loading data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    📊 Streaming Cuaca Solo (Real-time)
                </h2>
                <p className="text-red-200 bg-red-500/15 p-4 rounded-xl border border-red-500/30">
                    {error} - Data akan tersedia setelah GitHub Actions
                    berjalan.
                </p>
            </div>
        );
    }

    if (!latestData) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    📊 Streaming Cuaca Solo (Real-time)
                </h2>
                <p className="text-white/60">
                    Loading data... Tunggu GitHub Actions collect data pertama
                    kali.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            {/* Latest Data Card */}
            <div className="p-6 bg-gradient-to-br from-sky-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl border border-sky-400/30">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-white">
                        🌍 Data Streaming Solo (Real-time)
                    </h2>
                    <button
                        onClick={fetchWeatherData}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-500 hover:cursor-pointer text-white rounded-lg transition-colors text-sm font-medium"
                    >
                        Refresh
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <p className="text-white/60 text-sm">Suhu</p>
                        <p className="text-3xl font-bold text-amber-400">
                            {latestData.temperature}°C
                        </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <p className="text-white/60 text-sm">Kelembapan</p>
                        <p className="text-3xl font-bold text-blue-400">
                            {latestData.humidity}%
                        </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <p className="text-white/60 text-sm">Angin</p>
                        <p className="text-3xl font-bold text-green-400">
                            {latestData.windSpeed} km/h
                        </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <p className="text-white/60 text-sm">Cuaca</p>
                        <p className="text-lg font-bold text-white capitalize">
                            {latestData.weather}
                        </p>
                    </div>
                </div>

                <div className="text-xs text-white/40">
                    📍 Solo • Update: {lastUpdate}
                </div>
            </div>

            {/* Charts Section */}
            {chartData.length > 1 && (
                <div className="p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-6">
                        📈 Trend Data (12 Pengamatan Terakhir)
                    </h3>

                    {/* Temperature Chart */}
                    <div className="mb-8">
                        <h4 className="text-sm font-medium text-white/80 mb-3">
                            Suhu (°C)
                        </h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#334155"
                                />
                                <XAxis
                                    dataKey="time"
                                    stroke="#94a3b8"
                                    style={{ fontSize: "11px" }}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    style={{ fontSize: "11px" }}
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

                    {/* Humidity Chart */}
                    <div className="mb-8">
                        <h4 className="text-sm font-medium text-white/80 mb-3">
                            Kelembapan (%)
                        </h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#334155"
                                />
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

                    {/* Wind Speed Chart */}
                    <div>
                        <h4 className="text-sm font-medium text-white/80 mb-3">
                            Kecepatan Angin (km/h)
                        </h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#334155"
                                />
                                <XAxis
                                    dataKey="time"
                                    stroke="#94a3b8"
                                    style={{ fontSize: "11px" }}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    style={{ fontSize: "11px" }}
                                />
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

                    <div className="mt-4 text-xs text-white/40">
                        💾 Data disimpan otomatis setiap 5 menit via GitHub
                        Actions
                    </div>
                </div>
            )}
        </div>
    );
}
