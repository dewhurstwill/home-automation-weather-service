const makeRequest = require('./rest');
const config = require('../api/config');

async function getCurrentWeather(longitude='', latitude='', city='', units) {
  const headers = { 'Content-Type': 'application/json' };
  const apiKey = config.thirdparty.openweather.key;
  const response = await makeRequest(
    'GET',
    `https://api.openweathermap.org/data/2.5/weather?${city ? `q=${city}` : `lon=${longitude}&lat=${latitude}`}&units=${units}&appid=${apiKey}`,
    headers
  );
  return response;
}

module.exports = getCurrentWeather;
