const express = require('express');
const { fetchVehicles } = require('../controller/vehicle.report.controller');

const router = express.Router();

router.route('/').get(fetchVehicles);

module.exports = router;
