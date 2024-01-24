const test = document.querySelector(".weather");

const getCountryWeatherDataAPI = async function (country) {
  try {
    const getData = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=f9ce5709537446ce9ca85711242401&q=${country}=&aqi=no`
    );
    if (!getData.ok) throw new Error("Error fetching weather data");
    const response = await getData.json();
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

getCountryWeatherDataAPI("Pitesti");
const html = `
<p>${response.current.cloud}</p>`;
test.insertAdjacentHTML("afterbegin", html);
