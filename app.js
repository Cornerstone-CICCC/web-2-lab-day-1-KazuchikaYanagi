const getCityName = document.querySelector("#cityname");
const submit = document.querySelector("#submit");
const container = document.querySelector(".container");
const weatherContainer = document.querySelector("#weather-container");
const tableContainer = document.querySelector("#table-container");

async function getCityApi(city) {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    );
    const data = await res.json();
    // console.log(data);
    return data.results[0];
  } catch (err) {
    console.log(err);
  }
}

// getCityName();
// let city = getCityApi().results;
// console.log(city);

async function getWeatherApi(latitude, longitude) {
  try {
    // const getCityData = await getCityApi(city);
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
    );
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// getWeatherApi(49.242813, -123.105095);

function buildHtml(city, weather) {
  const table = document.createElement("table");
  const tr = document.createElement("tr");
  //   const th = document.createElement("th");
  const hCity = document.createElement("h2");
  const hTemp = document.createElement("h2");
  //   const p = document.createElement("p");
  const body = document.querySelector("body");

  weatherContainer.innerHTML = `
  <h2>${city.name}</h2>
  <h2>${weather.current.temperature_2m} ${weather.daily_units.temperature_2m_max}</h2>
  `;

  tableContainer.innerHTML = `
  <table id="table" class="">
    <tbody>
        <tr class="table-border">
            <td class="table-border">
                <h3>Country</h3>
            </td>
            <td class="table-border">
                <h3>${city.country}</h3>
            </td>
        </tr>
        <tr class="table-border">
            <td class="table-border">
                <h3>Timezone</h3>
            </td>
            <td class="table-border">
                <h3>${city.timezone}</h3>
            </td>
        </tr>
        <tr class="table-border">
            <td class="table-border">
                <h3>Population</h3>
            </td>
            <td class="table-border">
                <h3>${city.population}</h3>
            </td>
        </tr>
        <tr class="table-border">
            <td class="table-border">
                <h3>Tomorrow's Forecast</h3>
            </td>
            <td class="table-border">
                <h3>
                    Low: ${weather.daily.temperature_2m_min} ${weather.daily_units.temperature_2m_max}
                    <br>
                    Max: ${weather.daily.temperature_2m_max} ${weather.daily_units.temperature_2m_min}
                </h3>
            </td>
        </tr>
    </tbody>
  </table>
  `;

  if (weather.current.is_day === 1) {
    weatherContainer.classList.add("night");
    weatherContainer.classList.remove("morning");
    getCityName.classList.remove("cityname");
    getCityName.classList.add("night-cityname");
    submit.classList.remove("submit");
    submit.classList.add("night-submit");
    body.classList.add("night-mode");
    tr.classList.remove("table-border");
    tr.classList.add("night-border");
    tableContainer.classList.add("night-table");

    console.log(weather.current.is_day);
  } else {
    weatherContainer.classList.remove("night");
    weatherContainer.classList.add("morning");
    getCityName.classList.add("cityname");
    getCityName.classList.remove("night-cityname");
    submit.classList.add("submit");
    submit.classList.remove("night-submit");
    body.classList.remove("night-mode");
    tr.classList.add("table-border");
    tr.classList.remove("night-border");
    tableContainer.classList.remove("night-table");
    table.classList.remove("night-table");

    console.log(weather.current.is_day);
  }
}

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const city = await getCityApi(getCityName.value);
  console.log(city);
  const weather = await getWeatherApi(city.latitude, city.longitude);
  console.log(weather);
  buildHtml(city, weather);
});

// const cityData = submit.addEventListener("click", async () => {
//   const city = await getCityApi(cityData.value);
//   const weather = await getWeatherApi(city.latitude, city.longitude);
//   htmlCreation(city, weather);

//   e.preventDefault();
//   let cityName = await getCityName.value;
//   console.log(cityName);

//   let getCityData = await getCityApi(cityName);
//   let latitude = getCityData.results[0].latitude;
//   let longitude = getCityData.results[0].longitude;
//   console.log(getCityData);

//   let getWeatherData = await getWeatherApi(latitude, longitude);
//   console.log(getWeatherData);

//   htmlCreation(cityName, getWeatherData);
// });
