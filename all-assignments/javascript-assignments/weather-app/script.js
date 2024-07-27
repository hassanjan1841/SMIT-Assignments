document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const city = document.getElementById("city-input").value;
    if (city) {
      getWeatherData(city);
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // getWeatherData();
  getCurrentLocation();
});

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(latitude, longitude);
      geocoder.geocode({ latLng: latlng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            const city = results[0].address_components[2].long_name;
            console.log("city", city);
            // getWeatherData(city);
          } else {
            console.error("No results found");
          }
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    });
  } else {
    console.error("Geolocation is not supported by this browser");
  }
}

const loader = document.querySelector(".loader-container");
const weatherDetailsContainer = document.querySelector(".weather-details");

function getWeatherData(city) {
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

document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getCityName(lat, lon);
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert(
          "Failed to get your location. Please search for a city manually."
        );
      }
    );
  } else {
    alert(
      "Geolocation is not supported by this browser. Please search for a city manually."
    );
  }
});

function getCityName(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Unknown city";
      // city = ;
      // alert(`Current city is: ${city.split(" ").slice(0, 1).join(" ")}`);
      // console.log(`Current city is: ${city}`);
      // You can update the city input field or any other element with the city name
      getWeatherData(city.split(" ").slice(0, 1).join(" "));
    })
    .catch((error) => {
      console.error("Error fetching city name:", error);
      alert("Failed to get your city name. Please search for a city manually.");
    });
}
