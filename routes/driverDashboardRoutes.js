const express = require('express');
const router = express.Router();
const getDriverCounts = require('../controller/driver.dashboard.controller'); // Correct path and import

router.get('/counts', getDriverCounts);

module.exports = router;
