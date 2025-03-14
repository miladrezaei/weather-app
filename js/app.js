const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "d3ffc6995ba40931b6ed46beb1cdb544";
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendesday",
  "Tjursday",
  "Friday",
  "Saturday",
];
const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContaner = document.getElementById("weather");
const forecastContaner = document.getElementById("forecast");
const locationIcon = document.getElementById("location");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};
const getCurrentWeatherByCordinates = async (lat, lon) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getForecastWeatherByName = async (city) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getForecastWeatherByCordinates = async (lat, lon) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const renderCurrentWeather = (data) => {
  const weatherJSX = `
  <h1>${data.name}, ${data.sys.country}</h1>
  <div id="main">
    <img alt="weather icon" src="http://openweathermap.org/img/w/${
      data.weather[0].icon
    }.png">
    <span>${data.weather[0].main}</span>
    <p>${Math.round(data.main.temp)} ℃</p>
  </div>
  <div id="info">
    <p>Humidity: <span>${data.main.humidity} %</span></p>
    <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
  
  </div>  
  
  `;
  weatherContaner.innerHTML = weatherJSX;
};

const getWeekDay = (data) => {
  return DAYS[new Date(data * 1000).getDay()];
};
const renderForexastWeather = (data) => {
  forecastContaner.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJSX = `
            <div>
                 <img alt="weather icon" src="http://openweathermap.org/img/w/${
                   i.weather[0].icon
                 }.png">
                 <h3>${getWeekDay(i.dt)}</h3>
                 <p>${Math.round(i.main.temp)} ℃</p>
                 <span>${i.weather[0].main}</span>
            </div>
    `;
    forecastContaner.innerHTML += forecastJSX;
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value;

  if (!cityName) {
    alert("Plase enter city name!");
  }
  const currentData = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(currentData);
  const forecastData = await getForecastWeatherByName(cityName);
  renderForexastWeather(forecastData);
};

const positionCallbak = async (position) => {
  const { latitude, longitude } = position.coords;
  const currentData = await getCurrentWeatherByCordinates(latitude, longitude);
  renderCurrentWeather(currentData);
  const forecastData = await getForecastWeatherByCordinates(
    latitude,
    longitude
  );
  renderForexastWeather(forecastData);
};

const errorCallbak = (error) => {
  console.log(error.message);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallbak, errorCallbak);
  } else {
    alert("Your browser does not support geolocation");
  }
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
