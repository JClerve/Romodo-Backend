//Completed daily trips
const asyncHandler = require('express-async-handler');
const Trip = require('../model/trip.model');
const { startOfYear, endOfYear } = require('date-fns');

const countCompletedTrips = asyncHandler(async (req, res) => {
  try {
    // Find all completed trips
    const completedTrips = await Trip.aggregate([
      {
        $match: {
          status: true, // Only count completed trips
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$endTime" },
            month: { $month: "$endTime" },
            day: { $dayOfMonth: "$endTime" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    // Format data for response
    const formattedData = completedTrips.map(item => ({
      year: item._id.year,
      month: item._id.month,
      day: item._id.day,
      count: item.count
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching completed trips:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = { countCompletedTrips };
