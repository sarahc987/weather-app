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
  displayForecast();
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

function celConvert(event) {
  event.preventDefault();
  celButton.classList.add("active");
  fahrenButton.classList.remove("active");
  let temperatureElement = document.querySelector(".currentTemp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function fahrenConvert(event) {
  event.preventDefault();
  celButton.classList.remove("active");
  fahrenButton.classList.add("active");
  let temperatureElement = document.querySelector(".currentTemp");
  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="card col-2 forecastCard">
  <div class="card-body">
    <h5 class="card-title dayTitle">${day}</h5>
    <p class="card-text"><i class="fas fa-sun  fa-2x futureEmoji"></i><div class="minMax">
       <span class="maxTemp"> 22 </span>| <span class="minTemp">28</span>
    </div></p>
  </div>
</div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

currentTime();
search("Brisbane");
let celciusTemperature = null;
let fahrenButton = document.querySelector(".fahrenSymbol");
fahrenButton.addEventListener("click", fahrenConvert);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitCity);

let celButton = document.querySelector(".celSymbol");
celButton.addEventListener("click", celConvert);
