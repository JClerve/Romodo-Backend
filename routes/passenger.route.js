const { Router } = require("express");
const { getAllPassengers, updatePassengerStatus } = require('../controller/passenger.controller');

const router = Router();

router.get("/", getAllPassengers);
router.put("/:id", updatePassengerStatus);

module.exports = router;
