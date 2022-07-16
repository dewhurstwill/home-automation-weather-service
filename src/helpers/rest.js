const axios = require('axios');

async function makeRequest(method, url, headers, data) {
  return axios({
    method,
    url,
    headers,
    data,
    validateStatus: (status) => status < 500,
  })
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = makeRequest;
