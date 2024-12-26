
const tryCatch = require("../utils/TryCatch");
const { Request, Response } = require("express");
const { StandardResponse } = require("../dto/StandardResponse");
const { Passenger } = require("../types/SchemaTypes");
const PassengerModel = require("../model/passenger.model");
const sendEmail = require("../utils/sendEmail");

exports.getAllPassengers = tryCatch(async (req, res) => {
    const passenger= await PassengerModel.find();
    const response = { statusCode: 200, msg: "OK", data: passenger };
    res.status(200).send(response);
});

/*exports.deactivatePassenger = tryCatch(async (req, res) => {
    const { id } = req.params;
    const passenger = await PassengerModel.findByIdAndUpdate(id, { isActive: false });

    if (!passenger) {
        return res.status(404).send({ statusCode: 404, msg: "Passenger not found" });
    }

    // Send email notification
    const subject = "Account Deactivation Notice";
    const text = `Dear ${passenger.firstName},

Your account has been deactivated. If you have any questions, please contact support.

Best regards,
Your Company`;

    await sendEmail(passenger.email, subject, text);

    res.status(200).send({ statusCode: 200, msg: "Passenger deactivated" });
});*/

exports.updatePassengerStatus = tryCatch(async (req, res) => {
    const { id } = req.params;
    const { action } = req.body; // expects 'deactivate' or 'activate' in the request body

    // Determine the new status based on the action
    const isActive = action === 'activate';
    const passenger = await PassengerModel.findByIdAndUpdate(id, { isActive }, { new: true });

    if (!passenger) {
        return res.status(404).send({ statusCode: 404, msg: "Passenger not found" });
    }

    // Prepare email notification
    const subject = isActive ? "Account Reactivation Notice" : "Account Deactivation Notice";
    const text = `Dear ${passenger.firstName},

Your account has been ${isActive ? 'reactivated' : 'deactivated'}. If you have any questions, please contact support.

Best regards,
ROMODO`;

    // Send email notification
    await sendEmail(passenger.email, subject, text);

    res.status(200).send({ statusCode: 200, msg: `Passenger ${isActive ? 'reactivated' : 'deactivated'}` });
});