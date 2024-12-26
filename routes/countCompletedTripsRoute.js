const express = require('express');
const { countCompletedTrips } = require('../controller/countCompletedTripsController');

const router = express.Router();

// Route to count completed trips each day for the past month
router.get('/daily-completed', countCompletedTrips);

module.exports = router;
