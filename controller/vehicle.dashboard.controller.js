//vehicle status
const asyncHandler = require('express-async-handler');
const Vehicle = require('../model/vehicle.model');

const getVehicles = asyncHandler(async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const inServiceVehicles = await Vehicle.countDocuments({ availability: true });
    const outOfServiceVehicles = totalVehicles - inServiceVehicles;

    const vehicleCounts = {
      total: totalVehicles,
      inService: inServiceVehicles,
      outOfService: outOfServiceVehicles,
    };

    res.status(200).json({
      vehicles: vehicleCounts,
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch vehicle counts: ${error.message}` });
  }
});

module.exports = { getVehicles };
