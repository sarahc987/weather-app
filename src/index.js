function currentTime(date) {
  let now = new Date();

  let hour = now.getHours();

  let minutes = (now.getMinutes() < 10 ? "0" : " ") + now.getMinutes();
  let formattedTime = `${hour}:${minutes}`;

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = formattedTime;
}

function retrieveLocation(position) {
  let apiKey = "3def0561d3e06af25dd72c96c23230ff";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function error() {
  alert("Sorry, your location could not be found");
}

function getLocation() {
  result = document.querySelector("#showLocationButton");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(retrieveLocation, error);
  } else {
    alert("Sorry, your location could not be found");
  }
}
function showWeather(response) {
  let currentTemp = document.querySelector(".currentTemp");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  let humidity = document.querySelector("#humidity");
  let humidityValue = Math.round(response.data.main.humidity);
  humidity.innerHTML = `${humidityValue}%`;
  let wind = document.querySelector("#windSpeed");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windSpeed}km/h`;
  let weatherIcon = document.querySelector(".currentEmoji");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  let currentCity = document.querySelector(".currentCity");
  if (cityInput.value) {
    currentCity.innerHTML = `${cityInput.value}`;
  } else {
    alert("Please enter a city");
  }
  let apiKey = "3def0561d3e06af25dd72c96c23230ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function celConvert() {
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = "25°";
}

function fahrenConvert() {
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = "77°";
}

currentTime();
var result;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let celButton = document.querySelector(".celSymbol");
let fahrenButton = document.querySelector(".fahrenSymbol");
celButton.addEventListener("click", celConvert);
fahrenButton.addEventListener("click", fahrenConvert);
