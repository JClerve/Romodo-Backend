const asyncHandler = require('express-async-handler');
const PassengerModel = require('../model/passenger.model');

const fetchPassengers = asyncHandler(async (req, res) => {
  const passengers = await PassengerModel.find({});
  res.json(passengers);
});

module.exports = { fetchPassengers };
