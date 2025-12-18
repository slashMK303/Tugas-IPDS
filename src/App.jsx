import { useState } from "react";
import axios from "axios";
import WeatherTrend from "./components/WeatherTrend";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},ID&units=metric&appid=${apiKey}&lang=id`;

    const fetchWeather = () => {
        if (!location) return;
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
                setError("");
            })
            .catch(() => {
                setError("Kota tidak ditemukan atau kesalahan jaringan.");
                setData({});
            })
            .finally(() => {
                setLocation("");
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            fetchWeather();
        }
    };

    return (
        <div className="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white p-6">
            <div className="mx-auto max-w-2xl">
                <header className="mb-6 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Cuaca
                    </h1>
                    <p className="text-sm text-white/60">
                        Informasi cuaca kota di Indonesia
                    </p>
                </header>

                <div className="flex items-center gap-3">
                    <input
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Masukkan Kota (Contoh: Surabaya)"
                        type="text"
                        className="w-full rounded-xl bg-slate-800/60 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                    />
                    <button
                        onClick={fetchWeather}
                        disabled={!location}
                        className="rounded-xl bg-sky-600 hover:bg-sky-500 hover:cursor-pointer disabled:bg-slate-700 disabled:text-white/40 disabled:cursor-not-allowed px-2.5 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors"
                        aria-label="Cari cuaca"
                        title="Cari"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                        >
                            <path d="M10 2a8 8 0 105.293 14.293l3.707 3.707a1 1 0 001.414-1.414l-3.707-3.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
                        </svg>
                    </button>
                </div>

                {error && (
                    <p className="mt-3 rounded-md bg-red-500/15 text-red-200 border border-red-500/30 px-3 py-2 text-sm">
                        {error}
                    </p>
                )}

                {data.name !== undefined && (
                    <div className="mt-8 grid gap-6">
                        <div className="flex items-start justify-between rounded-2xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-sm shadow-lg">
                            <div className="space-y-1">
                                <p className="text-xl font-medium tracking-tight">
                                    {data.name}, Indonesia
                                </p>
                                <p className="text-sm text-white/60 capitalize">
                                    {data.weather &&
                                        data.weather[0]?.description}
                                </p>
                                <div className="mt-5">
                                    <h2 className="text-6xl font-semibold tracking-tight">
                                        {data.main?.temp?.toFixed(1)}°C
                                    </h2>
                                </div>
                            </div>
                            {data.weather && (
                                <img
                                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                    alt="Ikon cuaca"
                                    className="size-46"
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4 text-center backdrop-blur-sm">
                                <p className="text-xl font-semibold">
                                    {data.main?.feels_like?.toFixed(1)}°C
                                </p>
                                <p className="text-xs text-white/60 mt-1">
                                    Terasa Seperti
                                </p>
                            </div>
                            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4 text-center backdrop-blur-sm">
                                <p className="text-xl font-semibold">
                                    {data.main?.humidity}%
                                </p>
                                <p className="text-xs text-white/60 mt-1">
                                    Kelembapan
                                </p>
                            </div>
                            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4 text-center backdrop-blur-sm">
                                <p className="text-xl font-semibold">
                                    {(data.wind?.speed
                                        ? data.wind.speed * 3.6
                                        : 0
                                    ).toFixed(1)}{" "}
                                    km/jam
                                </p>
                                <p className="text-xs text-white/60 mt-1">
                                    Kecepatan Angin
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <WeatherTrend />
                </div>
            </div>
        </div>
    );
}

export default App;
