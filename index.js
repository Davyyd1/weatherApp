const test = document.querySelector(".weather__body");
const button = document.getElementById("button");

button.addEventListener("click", async function () {
  try {
    const input = document.getElementById("input").value;
    const getData = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=f9ce5709537446ce9ca85711242401&q=${input}=&aqi=no`
    );
    if (!getData.ok) throw new Error("Error fetching weather data");
    const response = await getData.json();
    console.log(response);
    const html1 = `
    <div class="weather__body--top">
    <div class="weather__body--top-1">
    <p class="temp">${response.current.temp_c}&deg;C</p>
    <img src="${response.current.condition.icon}" class="image">
    <p>${response.location.name}, ${response.location.country}</p>
    </p>
    </div>`;

    const html2 = `
    <div class="weather__body-main">
      <div class="weather__body-main--1">
        <img src="img/humidity.png">
        <p>${response.current.humidity}</p>
      </div>
      <div class="weather__body-main--2">
      <img src="img/feelslike.png">
      <p>${response.current.feelslike_c}</p>
      </div>
      <div class="weather__body-main--3">
      <img src="img/precip.png">
      <p>${response.current.precip_mm}</p>
      </div>
      <div class="weather__body-main--4">
      <img src="img/wind.png">
      ${response.current.wind_dir}
      </div>
      <div class="weather__body-main--5">
      <img src="img/wind.png">
      <p>${response.current.wind_kph}</p>
      </div>
      <p class="weather__body-main--6">${response.current.uv}</p>
    </div>
    `;
    test.insertAdjacentHTML("afterbegin", html1);
    test.insertAdjacentHTML("beforeend", html2);
  } catch (err) {
    console.error(err);
  }
});

// getCountryWeatherDataAPI("Pitesti");
// const html = `
// <p>${response.current.cloud}</p>`;
// test.insertAdjacentHTML("afterbegin", html);
