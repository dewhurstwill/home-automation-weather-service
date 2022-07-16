const app = require('./app');

const port = process.env.PORT || 5000;

if (!process.env.OPENWEATHERAPI_KEY) {
  console.error('Service requires an API key from openweathermap.org before starting up [Env var: OPENWEATHERAPI_KEY]');
  process.exit(1);
}

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
