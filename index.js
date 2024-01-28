const test = document.querySelector(".weather__body");
const button = document.getElementById("button");
const weather = document.querySelector(".weather");
const weatherC = document.querySelector(".weather__app-temp");
const weatherLocation = document.querySelector(".weather__app-city-time-name");
const weatherTime = document.querySelector(".weather__app-time");
const weatherIcon = document.querySelector(".weather__app-icon");
const weatherCondition = document.querySelector(".weather__app-condition-text");
const weatherCloudy = document.querySelector(".weather__app-panel-cloudy");
const weatherHumidity = document.querySelector(".weather__app-panel-humidity");
const weatherWind = document.querySelector(".weather__app-panel-wind");
const cities = document.getElementsByClassName("weather__app-city");
const citiesArray = Array.from(cities);

const fetchInputData = async function () {
  try {
    const input = document.getElementById("input").value;
    const getData = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=f9ce5709537446ce9ca85711242401&q=${input}=&aqi=no`
    );
    if (!getData.ok) throw new Error("Error fetching weather data");
    const response = await getData.json();
    return response;
  } catch (err) {
    alert(err + ": Location not found");
  }
};

const fetchCitiesData = async function (city) {
  try {
    const getCitiesData = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=f9ce5709537446ce9ca85711242401&q=${city}=&aqi=no`
    );
    const response = await getCitiesData.json();
    return response;
  } catch (err) {
    alert(err + ": City not found");
  }
};

const setDisplay = function (xy) {
  weatherC.textContent = xy.current.temp_c + "°C";
  weatherLocation.textContent = xy.location.name;
  weatherTime.textContent = xy.location.localtime;
  weatherIcon.src = xy.current.condition.icon;
  weatherCondition.textContent = xy.current.condition.text;
  weatherCloudy.textContent = xy.current.cloud + "%";
  weatherHumidity.textContent = xy.current.humidity + "%";
  weatherWind.textContent = xy.current.wind_kph + "kp/h";
};

button.addEventListener("click", async function () {
  const xy = await fetchInputData();
  changeWallpaperByWeather(xy);
  setDisplay(xy);
});

citiesArray.forEach((city) =>
  city.addEventListener("click", async function (city) {
    const xy = await fetchCitiesData(city.srcElement.innerHTML);
    changeWallpaperByWeather(xy);
    console.log(xy.current.condition.text.toLowerCase());
    setDisplay(xy);
  })
);

// check if is day or night
const changeWallpaperByWeather = function (xy) {
  if (xy.current.condition.text.toLowerCase().includes("rain")) {
    weather.style.backgroundImage = `url(img/${
      xy.current.is_day == 1 ? "day" : "night"
    }/rain.jpg)`;
  }
  if (xy.current.condition.text.toLowerCase().includes("clear")) {
    weather.style.backgroundImage = `url(img/${
      xy.current.is_day == 1 ? "day" : "night"
    }/sunny.jpg)`;
  }
  if (xy.current.condition.text.toLowerCase().includes("sunny")) {
    weather.style.backgroundImage = `url(img/${
      xy.current.is_day == 1 ? "day" : "night"
    }/sunny2.jpg)`;
  }
  if (
    xy.current.condition.text.toLowerCase().includes("snow") ||
    xy.current.condition.text.toLowerCase().includes("snowing")
  ) {
    weather.style.backgroundImage = `url(img/${
      xy.current.is_day == 1 ? "day" : "night"
    }/snowing.jpg)`;
  }
  if (
    xy.current.condition.text.toLowerCase().includes("cloud") ||
    xy.current.condition.text.toLowerCase().includes("cloudy")
  ) {
    weather.style.backgroundImage = `url(img/${
      xy.current.is_day == 1 ? "day" : "night"
    }/cloudy.jpg)`;
  }
};
