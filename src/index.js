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

function retrieveLocation(position) {
  let apiKey = "3def0561d3e06af25dd72c96c23230ff";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
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
  let weatherIcon = document.querySelector(".currentEmoji");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
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

function celConvert() {
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = "25°";
}

function fahrenConvert() {
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = "77°";
}

currentTime();
search("Brisbane");
var result;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let celButton = document.querySelector(".celSymbol");
let fahrenButton = document.querySelector(".fahrenSymbol");
celButton.addEventListener("click", celConvert);
fahrenButton.addEventListener("click", fahrenConvert);
