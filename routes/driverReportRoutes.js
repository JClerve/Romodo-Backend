const express = require('express');
const { fetchDrivers } = require('../controller/driver.report.controller');

const router = express.Router();

router.route('/').get(fetchDrivers);

module.exports = router;
