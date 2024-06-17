const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        console.log(data);
        
        // Update DOM with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
        document.querySelector(".feels-like").innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°C";

        // Update weather icon based on weather conditions
        // Make sure you have appropriate image paths based on weather conditions
        if (data.weather && data.weather.length > 0) {
            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "/images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "/images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "/images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "/images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "/images/mist.png";
                    break;
                default:
                    weatherIcon.src = ""; // Provide a default image or handle unknown conditions
                    break;
            }
        }

        // Display weather information
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Handle error in UI
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Event listeners for search button and input field
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
