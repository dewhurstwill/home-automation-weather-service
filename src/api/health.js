const express = require('express');
const config = require('./config');

const router = express.Router();

function getUptime() {
  let healthCheckUptime = process.uptime();
  if (healthCheckUptime < 3600) {
    const [m, s] = new Date(healthCheckUptime * 1000).toISOString().substring(14, 19).split(':')
    healthCheckUptime = `${m} minute(s), ${s} second(s)`;
  } else if (healthCheckUptime >= 3600 && healthCheckUptime >= (3600 * 24)) {
    const [h, m, s] = new Date(healthCheckUptime * 1000).toISOString().substring(14, 19).split(':');
    healthCheckUptime = `${h} hour(s), ${m} minute(s), ${s} second(s)`;
  } else {
    const [date] = healthCheckUptime.split('T');
    const [year, month, day] = date.split('-');
    healthCheckUptime = `${Number(year) - 1970} year(s), ${Number(month) - 1} month(s), ${Number(day) - 1} day(s), ${new Date(healthCheckUptime * 1000).toISOString().substring(11, 16)}`
  }
  return healthCheckUptime;
}

router.get('/', (req, res) => {
  const healthcheck = {
    service: config.serviceInfo.microservice,
    uptime: getUptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
});

module.exports = router;