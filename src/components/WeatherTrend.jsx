import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import TemperatureChart from "./TemperatureChart";
import HumidityChart from "./HumidityChart";
import WindSpeedChart from "./WindSpeedChart";

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
        const trimmed = csvText.trim();
        if (!trimmed) return [];

        const lines = trimmed.split(/\r?\n/);
        if (lines.length < 2) return [];

        const headers = lines[0].split(",").map((h) => h.trim());

        const rows = lines.slice(1).map((line) => {
            const values = line.split(",");
            const rec = {};
            headers.forEach((h, i) => (rec[h] = values[i]?.trim()));

            const get = (...keys) =>
                keys
                    .map((k) => rec[k])
                    .find((v) => v !== undefined && v !== "");

            const waktuRaw = get("waktu", "timestamp");
            const date = waktuRaw ? new Date(waktuRaw) : null;
            const time =
                date && !isNaN(date)
                    ? date.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                      })
                    : "-";

            const temperature = parseFloat(
                get("suhu_celsius", "temperature_c")
            );
            const humidity = parseFloat(
                get("kelembapan_persen", "humidity_percent")
            );
            const windSpeed = parseFloat(
                get("kecepatan_angin_kmh", "wind_speed_kmh")
            );

            const weather =
                get(
                    "deskripsi_cuaca",
                    "weather_description",
                    "cuaca_utama",
                    "weather_main"
                ) || "N/A";
            const icon = get("ikon_cuaca", "weather_icon") || "01d";

            return { time, temperature, humidity, windSpeed, weather, icon };
        });

        // Filter out rows with invalid numbers entirely to prevent NaN in UI
        return rows.filter((r) =>
            [r.temperature, r.humidity, r.windSpeed].some((x) =>
                Number.isFinite(x)
            )
        );
    };

    if (loading) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Streaming Cuaca Solo
                </h2>
                <p className="text-white/60">Loading data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Streaming Cuaca Solo (Real-time)
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
                    Streaming Cuaca Solo (Real-time)
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
            <WeatherCard
                latestData={latestData}
                lastUpdate={lastUpdate}
                onRefresh={fetchWeatherData}
            />

            {/* Charts Section */}
            {chartData.length > 1 && (
                <div className="p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-6">
                        Trend Data (12 Update Terakhir - Setiap 5 Menit)
                    </h3>

                    <TemperatureChart data={chartData} />
                    <HumidityChart data={chartData} />
                    <WindSpeedChart data={chartData} />

                    <div className="mt-4 text-xs text-white/40">
                        Data disimpan otomatis setiap 5 menit via GitHub
                        Actions
                    </div>
                </div>
            )}
        </div>
    );
}
