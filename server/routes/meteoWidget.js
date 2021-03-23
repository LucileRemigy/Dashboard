const apiKey = "477be9dc3fbbfb0dc5d235cb1195e5d4";

const cookieParser = require("cookie-parser");
var weather = require("openweather-apis");
const axios = require("axios");

weather.setLang("fr");
weather.setAPPID(apiKey);

async function getWeather(city) {
  let path =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric&lang=en";

  let res = await axios.get(path);
  let weather = res.data.weather;
  //console.log("le res est", weather[0].description);
  return { value: weather[0].description };
}

async function getTemperature(city) {
  let path =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric&lang=en";

  let res = await axios.get(path);

  //console.log("le res est", res.data.main.temp);
  return { value: res.data.main.temp };
}

module.exports = {
  getWeather,
  getTemperature,
};
