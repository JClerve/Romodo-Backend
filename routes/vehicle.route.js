const { Router } = require("express");
const {
    deleteVehicle, getVehicle, createVehicle, getAllVehicles, updateVehicle
} = require("../controller/vehilce.controller");

const router = Router();

router.post("/", createVehicle);
router.get("/:id", getVehicle);
router.put("/:id", updateVehicle);
router.get("/", getAllVehicles);
router.delete("/:id", deleteVehicle);

module.exports = router;
