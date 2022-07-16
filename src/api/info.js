const express = require('express');
const config = require('./config');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    ...config.serviceInfo
  });
});

module.exports = router;