//Issue Status
const asyncHandler = require('express-async-handler');
const Issue = require('../model/issue.model');

const getIssuesComparison = asyncHandler(async (req, res) => {
  try {
    const issues = await Issue.aggregate([
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, type: "$incidentType" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.year",
          data: {
            $push: { type: "$_id.type", count: "$count" }
          }
        }
      }
    ]);

    const formattedIssues = issues.map(issue => {
      const formattedIssue = {
        year: issue._id,
        accidents: 0,
        malfunctions: 0
      };

      issue.data.forEach(({ type, count }) => {
        if (type === 'Accident') {
          formattedIssue.accidents += count;
        } else if (type === 'Malfunction') {
          formattedIssue.malfunctions += count;
        }
      });

      return formattedIssue;
    });

    res.json(formattedIssues); // Send the formatted response
  } catch (err) {
    res.status(500).json({ message: `Failed to fetch issue counts by year: ${err.message}` });
  }
});

module.exports = { getIssuesComparison };
