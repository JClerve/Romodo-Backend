const asyncHandler = require('express-async-handler');
const Vehicle = require('../model/vehicle.model');

// Function to fetch vehicles
const fetchVehicles = asyncHandler(async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch vehicles: ${error.message}` });
  }
});

module.exports = { fetchVehicles };
