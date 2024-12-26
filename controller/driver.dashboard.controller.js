//Driver status

const asyncHandler = require('express-async-handler');
const Driver = require('../model/driver.model');

// Function to get driver counts
const getDriverCounts = asyncHandler(async (req, res) => {
  try {
    const totalDrivers = await Driver.countDocuments();
    const availableDrivers = await Driver.countDocuments({ availability: true });
    const unavailableDrivers = totalDrivers - availableDrivers;

    const driverCounts = {
      total: totalDrivers,
      available: availableDrivers,
      unavailable: unavailableDrivers,
    };

    res.status(200).json({ drivers: driverCounts });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch driver counts: ${error.message}` });
  }
});

module.exports = getDriverCounts;
