const asyncHandler = require('express-async-handler');
const Driver = require('../model/driver.model');

// Function to fetch drivers
const fetchDrivers = asyncHandler(async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch drivers: ${error.message}` });
  }
});

module.exports = { fetchDrivers };
