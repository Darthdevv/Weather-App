'use strict'

const degreeCelisus = document.querySelector('.degrees');
const cityName = document.querySelector('.city');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.getElementById('search-icon');

const API_KEY = "7e01a52a416412b73fb49baf3bf0d61c";
let data = [];
document.onload = getWeatherData();


async function getWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  data = await response.json();
  console.log(data)
    displayWeather()
  
}



searchIcon.addEventListener('click', () => {
  const city = searchInput.value.trim();
  getWeatherData(city);
  displayWeather(city);
})


function displayWeather() {
  cityName.innerHTML = data.name
  degreeCelisus.innerHTML = Math.trunc(data.main.temp) + '°C';

}

// const successCallback = (position) => {
//   console.log(position);
// };

// const errorCallback = (error) => {
//   console.log(error);
// };

// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);