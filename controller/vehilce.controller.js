const tryCatch = require("../utils/TryCatch");
const { Request, Response } = require("express");
const { StandardResponse } = require("../dto/StandardResponse");
const VehicleModel = require("../model/vehicle.model");
const { Vehicle } = require("../types/SchemaTypes");

/**
 * Create a vehicle
 */
exports.createVehicle = tryCatch(async (req, res) => {
    const vehicle = req.body;
    const vehicleModel = new VehicleModel(vehicle);
    const savedVehicle = await vehicleModel.save();
    const response = { statusCode: 201, msg: "created successfully", data: savedVehicle._id };
    res.status(201).send(response);
});

/**
 * Get all vehicles
 */
exports.getAllVehicles = tryCatch(async (req, res) => {
    const vehicles = await VehicleModel.find();
    const response = { statusCode: 200, msg: "OK", data: vehicles };
    res.status(200).send(response);
});

/**
 * Get a vehicle
 */
exports.getVehicle = tryCatch(async (req, res) => {
    const vehicle = await VehicleModel.findOne({ id: req.params.id });
    if (!vehicle) {
        const errorResponse = { statusCode: 400, msg: `${req.params.id} vacancy not found!` };
        return res.status(404).send(errorResponse);
    }
    const response = { statusCode: 200, msg: "OK", data: vehicle };
    res.status(200).send(response);
});

/**
 * Update a vehicle
 */
/*exports.updateVehicle = tryCatch(async (req, res) => {
    const vehicleId = req.params.id;

    const vehicle = await VehicleModel.findOne({ _id: vehicleId });
    if (!vehicle) {
        const errorResponse = { statusCode: 404, msg: `${req.params.id} Vehicle not found!` };
        return res.status(404).send(errorResponse);
    }
    await VehicleModel.findOneAndUpdate({ _id: vehicleId }, req.body);
    res.status(204).send();
    

});*/

exports.updateVehicle = tryCatch(async (req, res) => {
    const vehicleId = req.params.id;
    console.log(req.body);
    const updateFields = {};

    if (req.body.no) updateFields.no = req.body.no;
    if (req.body.type) updateFields.type = req.body.type;
    if (req.body.chassisNo) updateFields.chassisNo = req.body.chassisNo;
    if (req.body.productionYear) updateFields.productionYear = new Date(req.body.productionYear);
    if (req.body.ac !== undefined) updateFields.ac = req.body.ac;
    if (req.body.brand) updateFields.brand = req.body.brand;
    if (req.body.fuelType) updateFields.fuelType = req.body.fuelType;
    if (req.body.noOfSeats) updateFields.noOfSeats = req.body.noOfSeats;
    if (req.body.availability !== undefined) updateFields.availability = req.body.availability;

    try {
        const vehicle = await VehicleModel.findOneAndUpdate(
            { id: vehicleId },
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        return res.status(200).json({ status: true, message: 'Vehicle updated successfully', data: vehicle });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});

/**
 * Delete a vehicle
 */
exports.deleteVehicle = tryCatch(async (req, res) => {
    const vehicle = await VehicleModel.findOne({ id: req.params.id });
    if (!vehicle) {
        const errorResponse = { statusCode: 404, msg: `${req.params.id} vehicle not found!` };
        return res.status(404).send(errorResponse);
    }
    await VehicleModel.findOneAndDelete({ id: req.params.id });
    res.status(204).send();
});
