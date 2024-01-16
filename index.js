'use strict'

const degreeCelisus = document.querySelector('.degrees');
const cityName = document.querySelector('.city');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.getElementById('search-icon');
const humidityPercentage = document.querySelector('.percentage-1');
const windSpeedPercentage = document.querySelector('.percentage-2');
const weatherImage = document.getElementById('weather-img');

const API_KEY = "7e01a52a416412b73fb49baf3bf0d61c";
let data = [];

async function getWeatherData(city = 'madagascar') {

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (response.status === 404) {
    document.querySelector('.error').classList.remove('hidden');
    document.getElementById('weather').classList.add('hidden');
  } else {
    data = await response.json();
    displayWeather();
  }
  
}

searchIcon.addEventListener('click', () => {
  const city = searchInput.value.trim();
  getWeatherData(city);
})

function displayWeather() {

  document.getElementById('weather').classList.remove('hidden');
  document.querySelector('.error').classList.add('hidden');

  cityName.innerHTML = data.name
  degreeCelisus.innerHTML = Math.trunc(data.main.temp) + '°C';
  humidityPercentage.innerHTML = data.main.humidity + '%'
  windSpeedPercentage.innerHTML = data.wind.speed + ' km/h'

  if (data.weather[0].main === 'Clouds') {
    weatherImage.src = "assets/images/weather_icons/04d.png";
  } else if(data.weather[0].main === 'Clear'){
    weatherImage.src = "assets/images/weather_icons/01d.png"; 
  } else if (data.weather[0].main === 'Snow') {
    weatherImage.src = "assets/images/weather_icons/13d.png"; 
  } else if (data.weather[0].main === 'Rain') {
    weatherImage.src = "assets/images/weather_icons/10d.png"; 
  } else if (data.weather[0].main === "Thunderstorm") {
    weatherImage.src = "assets/images/weather_icons/11d.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherImage.src = "assets/images/weather_icons/09d.png";
  } else if (data.weather[0].main === "Haze") {
    weatherImage.src = "assets/images/weather_icons/50d.png";
  }

  searchInput.value = '';
}
