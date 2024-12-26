const express = require('express');
const router = express.Router();
const { getTripCounts } = require('../controller/trip.dashboard.controller'); // Correct path and import

router.get('/counts', getTripCounts); // Route for fetching trip counts

module.exports = router;
