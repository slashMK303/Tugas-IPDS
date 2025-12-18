export default async function handler(req, res) {
    // Check CRON_SECRET for security (Vercel adds this header for Cron jobs)
    if (req.headers.get("Authorization") !== `Bearer ${import.meta.env.CRON_SECRET}`) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const city = "Solo,ID";
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API key not set in environment variables." });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`OpenWeatherMap error: ${response.status}`);
        }
        const data = await response.json();

        const result = {
            city: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            wind_kmh: Math.round((data.wind.speed || 0) * 3.6),
            weather: data.weather[0]?.main,
            description: data.weather[0]?.description,
            timestamp: new Date().toISOString(),
        };

        // TODO: Insert ke database (misal: BigQuery, Firestore, atau PostgreSQL)
        // Contoh: await insertToBigQuery(result);
        console.log("Weather data ingested for streaming:", result);

        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error("Cron job error:", err);
        return res.status(500).json({ error: err.message });
    }
}
