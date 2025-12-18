export default function WeatherCard({ latestData, lastUpdate, onRefresh }) {
    const getWeatherIcon = (iconCode) => {
        return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div className="p-6 bg-gradient-to-br from-sky-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl border border-sky-400/30">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white">
                    🌍 Data Streaming Solo (Real-time)
                </h2>
                <button
                    onClick={onRefresh}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 hover:cursor-pointer text-white rounded-lg transition-colors text-sm font-medium"
                >
                    🔄 Refresh
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
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col items-center justify-center">
                    <p className="text-white/60 text-sm mb-2">Cuaca</p>
                    {latestData.icon && (
                        <img
                            src={getWeatherIcon(latestData.icon)}
                            alt={latestData.weather}
                            className="w-12 h-12"
                        />
                    )}
                    <p className="text-sm font-medium text-white capitalize text-center mt-1">
                        {latestData.weather}
                    </p>
                </div>
            </div>

            <div className="text-xs text-white/40">
                📍 Solo • Update: {lastUpdate}
            </div>
        </div>
    );
}
