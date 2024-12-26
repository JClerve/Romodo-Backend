const asyncHandler = require('express-async-handler');
const IssueModel = require('../model/issue.model');

const fetchIssues = asyncHandler(async (req, res) => {
  const issues = await IssueModel.find({});
  res.json(issues);
});

module.exports = { fetchIssues };
