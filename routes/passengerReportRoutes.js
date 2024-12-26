const express = require('express');
const router = express.Router();
const { fetchPassengers } = require('../controller/passenger.report.controller');

router.route('/').get(fetchPassengers);

module.exports = router;
