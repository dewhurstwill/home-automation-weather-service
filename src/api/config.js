const Joi = require('joi');

module.exports = {
  host: process.env.HOST || '',
  server: process.env.SERVER || '',
  redis: {
    connectionString: 'redis://localhost'
  },
  thirdparty: {
    openweather: {
      key: process.env.OPENWEATHERAPI_KEY || 'bf88e64dfd3ed5855006194034565ad1'
    }
  },
  currentWeather: {
    schema: Joi.object({
      longitude: Joi.string(),
      latitude: Joi.string(),
      city: Joi.string(),
      units: Joi.string().required()
    })
  },
  serviceInfo: {
    microservice: process.env.NAME || 'Weather Proxy Service',
    routes: [{
      path: '/api/v1/health',
      methods: ['GET'],
      description: 'Returns the health status of the service'
    }, {
      path: '/api/v1/info',
      methods: ['GET'],
      description: 'Returns useful information about the service'
    }, {
      path: '/api/v1/weather/current',
      methods: ['POST'],
      description: '',
      schema: {
        POST: {
          longitude: 'String',
          latitude: 'String',
          city: 'Required unless using lon&lat, String',
          units: 'Required, String [standard, metric, imperial] - Use metric by default'
        }
      }
    }],
    description: process.env.DESCRIPTION || '',
  }
}