const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "public")));

// API route (now at `/`)
app.get('/', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.sendFile(path.join(__dirname, "public", "index.html"));
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
