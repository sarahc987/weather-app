function currentTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "3def0561d3e06af25dd72c96c23230ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let currentWeather = document.querySelector(".currentWeather");
  currentWeather.innerHTML = response.data.weather[0].description;
  let cityElement = document.querySelector(".currentCity");
  cityElement.innerHTML = response.data.name;
  let currentTemp = document.querySelector(".currentTemp");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  let humidity = document.querySelector("#humidity");
  let humidityValue = Math.round(response.data.main.humidity);
  humidity.innerHTML = `${humidityValue}%`;
  let wind = document.querySelector("#windSpeed");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windSpeed}km/h`;
  celciusTemperature = response.data.main.temp;
  let weatherIcon = document.querySelector(".currentEmoji");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  let dateElement = document.querySelector("#current-time");
  dateElement.innerHTML = currentTime(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "3def0561d3e06af25dd72c96c23230ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  search(cityInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="card col-2 forecastCard">
  <div class="card-body">
    <h5 class="card-title dayTitle">${formatDay(forecastDay.dt)}</h5>
    <p class="card-text"><div><img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" class="futureEmoji" /></div><div class="minMax">
       <span class="maxTemp"> ${Math.round(
         forecastDay.temp.max
       )}° </span>| <span class="minTemp">${Math.round(
          forecastDay.temp.min
        )}°</span>
    </div></p>
  </div>
</div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("Brisbane");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitCity);
