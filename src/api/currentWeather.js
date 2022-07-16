const express = require('express');
const redis = require('redis');
const crypto = require('crypto');
const config = require('./config');
const {
  getCurrentWeather
} = require('../helpers');

const router = express.Router();
const redisClient = redis.createClient({ url: config.redis.connectionString });

const validUnits = ['standard', 'metric', 'imperial'];

router.post('/', async (req, res) => {
  await redisClient.connect();
  const { schema } = config.currentWeather;
  try {
    const { longitude, latitude, city, units } = await schema.validateAsync(req.body);
    if (!validUnits.includes(units)) return res.status(422).json({ message: `Units must be one of the following ${validUnits}` });
    const hashKey = crypto.createHash('md5').update(`${longitude}:${latitude}:${city}:${units}`).digest('hex');
    const cachedResponse = await redisClient.get(hashKey);
    if (cachedResponse) {
      await redisClient.quit();
      return res.json({ weatherData: JSON.parse(cachedResponse) });
    }
    const currentWeather = await getCurrentWeather(longitude, latitude, city, units);
    await redisClient.set(hashKey, JSON.stringify(currentWeather));
    await redisClient.quit();
    return res.json({ weatherData: currentWeather });
  } catch (err) {
    console.log(err)
    await redisClient.quit();
    if (err && err.details && err.details[0].message) {
      return res.status(422).json({
        schema: config.serviceInfo.routes[2].schema.POST,
        message: err.details[0].message
      });
    }
    return res.status(422).json({ message: err });
  }
});

module.exports = router;
