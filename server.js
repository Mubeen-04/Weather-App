const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // Load environment variables if using .env file

const app = express();
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000

const apiKey = process.env.API_KEY; // Load API key from environment variable

app.use(express.static('public')); // Assuming client-side assets are in a 'public' directory

// Endpoint for fetching weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;
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
