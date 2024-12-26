const express = require('express');
const router = express.Router();
const { fetchIssues } = require('../controller/issues.report.controller');

router.route('/').get(fetchIssues);

module.exports = router;
