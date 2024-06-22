document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const city = document.getElementById("city-input").value;
    if (city) {
      getWeatherData(city);
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  getWeatherData();
});

const loader = document.querySelector(".loader-container");
const weatherDetailsContainer = document.querySelector(".weather-details");

function getWeatherData(city = "karachi") {
  const apiKey = "666d863e20748cfbbb83509bbae9f30f"; // Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  weatherDetailsContainer.style.display = "none";
  loader.style.display = "flex";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      weatherDetailsContainer.style.display = "flex";
      updateCurrentWeather(data);
      getForecastData(city);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert(
        "Failed to fetch weather data. Please check your API key and try again."
      );
    })
    .finally(() => {
      loader.style.display = "none";
    });
}

function updateCurrentWeather(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById(
    "description"
  ).textContent = `Description: ${data.weather[0].description}`;
  document.getElementById("wind").textContent = `Wind: ${data.wind.speed} km/h`;
  document.getElementById(
    "weather-icon"
  ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById(
    "pressure"
  ).textContent = `Pressure: ${data.main.pressure} hPa`;
}

function getForecastData(city) {
  const apiKey = "666d863e20748cfbbb83509bbae9f30f"; // Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      updateForecast(data);
    })
    .catch((error) => {
      console.error("Error fetching forecast data:", error);
      alert(
        "Failed to fetch forecast data. Please check your API key and try again."
      );
    });
}

function updateForecast(data) {
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";

  const dailyData = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  dailyData.forEach((day) => {
    const forecastCard = document.createElement("div");
    forecastCard.className = "forecast-card";
    forecastCard.innerHTML = `
            <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="Weather Icon">
            <p>${day.main.temp}°C</p>
            <p>${day.weather[0].description}</p>
        `;
    forecastContainer.appendChild(forecastCard);
  });
}
