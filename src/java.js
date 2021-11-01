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
}

function searchInput(event) {
  event.preventDefault();
  let apiKey = "6d6c3fbb4215106d7c035ce13afdbe56";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let cityInput = document.querySelector("#inputAddress").value;
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityTemp);
}
let form = document.querySelector("#search");
form.addEventListener("submit", searchInput);

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
