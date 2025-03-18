const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`/?city=${city}`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        console.log(data);

        // Update UI
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
        document.querySelector(".feels-like").innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°C";

        // Update weather icon
        const weatherCondition = data.weather[0].main.toLowerCase();
        weatherIcon.src = `images/${weatherCondition}.png`;

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Event listeners
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
