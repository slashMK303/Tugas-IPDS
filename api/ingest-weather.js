// /api/ingest-weather.js
// Serverless endpoint for Vercel to fetch weather data for Solo and (optionally) store/process it

export default async function handler(req, res) {
    const city = "Solo,ID";
    const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.VITE_API_KEY || import.meta.env.VITE_API_KEY;
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

        // Transform data as needed (example: extract only relevant fields)
        const result = {
            city: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            wind_kmh: Math.round((data.wind.speed || 0) * 3.6),
            weather: data.weather[0]?.main,
            description: data.weather[0]?.description,
            timestamp: new Date().toISOString(),
        };

        // TODO: Insert to database (e.g., BigQuery) if needed
        // For now, just return the result
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Vercel: This file must be in /api (project root, not src/) to work as a serverless function.