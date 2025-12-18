// /api/ingest-weather.js - Vercel Serverless Function for Weather Data Streaming
// This endpoint is triggered by Vercel Cron Jobs to fetch and ingest weather data for Solo

export default async function handler(req, res) {
    // Verify CRON_SECRET for security
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

    if (authHeader !== expectedAuth) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const city = 'Solo';
        const country = 'ID';
        const apiKey = process.env.VITE_API_KEY;

        if (!apiKey) {
            console.error('API key not configured');
            return res.status(500).json({ error: 'API key not set' });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=id`;

        const weatherResponse = await fetch(url);
        if (!weatherResponse.ok) {
            throw new Error(`OpenWeatherMap API error: ${weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json();

        // Transform and prepare data for storage (ETL: Extract, Transform, Load)
        const ingestedData = {
            city: weatherData.name,
            country: weatherData.sys?.country,
            temperature: weatherData.main.temp,
            feelsLike: weatherData.main.feels_like,
            humidity: weatherData.main.humidity,
            windSpeedMps: weatherData.wind.speed,
            windSpeedKmh: Math.round(weatherData.wind.speed * 3.6),
            weatherMain: weatherData.weather[0]?.main,
            weatherDescription: weatherData.weather[0]?.description,
            cloudCoverage: weatherData.clouds?.all,
            timestamp: new Date().toISOString(),
            unixTimestamp: Math.floor(Date.now() / 1000),
        };

        // TODO: Insert to database (BigQuery, Firestore, PostgreSQL, etc.)
        // Example for future database integration:
        // await insertToBigQuery(ingestedData);
        // await insertToFirestore(ingestedData);

        console.log('✓ Weather data ingested successfully:', ingestedData);

        return res.status(200).json({
            success: true,
            message: 'Weather data ingested successfully',
            data: ingestedData,
        });
    } catch (error) {
        console.error('✗ Cron job error:', error.message);
        return res.status(500).json({
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
}
