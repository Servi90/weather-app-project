// Display date and time

function currentTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = document.querySelector("#current-time");
  time.innerHTML = `${day} ${hours}:${minutes}`;
}

currentTime();

// Display forecast for the next five days

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div id="forecast" class="row">`;

  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3 mx-auto" align="center">
        <div class= "weather-forecast-date" id="day-to-day">${formatDay(
          forecastDay.dt
        )}</div>
            <img class ="dailyIcon" id="icon-forecast" alt="" 
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" /> <br />
            <span id="forecast-max">${Math.round(forecastDay.temp.max)}°</span> 
            <span id="forecast-min">${Math.round(forecastDay.temp.min)}°</span>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6d6c3fbb4215106d7c035ce13afdbe56";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// Display the temperature and name of any city we search for

function showCityTemp(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#big-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humi-data").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-data").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#condi-data").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#bigiconweather");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "6d6c3fbb4215106d7c035ce13afdbe56";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputAddress");
  search(cityInput.value);
}

search("Madrid");

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

// Display the temperature of our current location

function searchCurrent(position) {
  let apiKeys = "6d6c3fbb4215106d7c035ce13afdbe56";
  let apiEndpoints = "https://api.openweathermap.org/data/2.5/weather";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let uni = "metric";
  let apiUrls = `${apiEndpoints}?lat=${latitude}&lon=${longitude}&appid=${apiKeys}&units=${uni}`;
  axios.get(apiUrls).then(showCityTemp);
}

function currentGps(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrent);
}
let searchButton = document.querySelector("#current-position-b");
searchButton.addEventListener("click", currentGps);

// Convert temperature into farenheit and celsius

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#big-temperature");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#big-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
