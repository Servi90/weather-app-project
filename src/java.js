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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 mx-auto" align="center">
        <div class= "weather-forecast-date" id="day-to-day">${day}</div><br />
            <img class ="daily-icon" id="icon-forecast" alt="" 
            src="http://openweathermap.org/img/wn/50d@2x.png" /> <br />
            <span id="forecast-max">16</span> 
            <span id="forecast-min">10</span>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

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

searchInput();
