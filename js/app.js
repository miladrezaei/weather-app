const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "d3ffc6995ba40931b6ed46beb1cdb544";
const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContaner = document.getElementById("weather");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const renderCurrentWeather = (data) => {
  console.log(data);
  const weatherJSX = `
  <h1>${data.name}, ${data.sys.country}</h1>
  <div>
    <img alt="weather icon" src= http://openweathermap.org/img/w/${data.weather[0].icon}.png>
    <span>${data.weather[0].main}</span>
    <p>${data.main.temp}</p>
  </div>
  `;
  weatherContaner.innerHTML = weatherJSX;
};

const searchHandler = async () => {
  const cityName = searchInput.value;

  if (!cityName) {
    alert("Plase enter city name!");
  }
  const currentData = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(currentData);
};
searchButton.addEventListener("click", searchHandler);
