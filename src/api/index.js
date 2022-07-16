const express = require('express');
const info = require('./info');
const health = require('./health');
const currentWeather = require('./currentWeather');

const router = express.Router();

router.use('/', info);
router.use('/health', health);
router.use('/weather/current', currentWeather);

module.exports = router;
