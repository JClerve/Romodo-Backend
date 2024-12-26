const express = require('express');
const router = express.Router();
const { getIssuesComparison } = require('../controller/issue.dashboard.controller'); // Correct path and import

router.get('/counts', getIssuesComparison); // Route for fetching issue counts

module.exports = router;
