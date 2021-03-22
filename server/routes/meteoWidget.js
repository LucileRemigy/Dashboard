const apiKey = "477be9dc3fbbfb0dc5d235cb1195e5d4";

var weather = require("openweather-apis");

weather.setLang("fr");
weather.setAPPID(apiKey);

async function getWeather(city) {
  weather.setCity(city);

  weather.getDescription(function (err, desc) {
    console.log("the description of the weather is:", desc);
  });
}

async function getTemperature(city) {
  weather.setCity(city);

  weather.getTemperature(function (err, temp) {
    console.log("the temperature of the weather is:", temp);
  });
}

module.exports = {
  getWeather,
  getTemperature,
};
