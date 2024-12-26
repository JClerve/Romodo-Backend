const tryCatch = require("../utils/TryCatch");
const { Request, Response } = require("express");
const { StandardResponse } = require("../dto/StandardResponse");
const { Driver } = require("../model/schema.types.model");
const DriverModel = require("../model/driver.model");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const nodemailer = require('nodemailer');
const validator = require('validator');
const sendEmail = require("../utils/sendEmail");

function generatePassword(length) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = uppercase + lowercase + numbers + specialChars;
    
    let password = '';
    
    // Ensure the password includes at least one character from each category
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    
    // Fill the remaining length with random characters from all categories
    for (let i = 4; i < length; i++) {
      const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
      password += randomChar;
    }
    
    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    
    return password;
  }

function generateUsername(name) {
    return name.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 1000);
}

/**
 * Create a driver
 */
exports.createDriver = tryCatch(async (req, res) => {
    const driver = req.body;

    console.log(driver);

    const username = generateUsername(driver.lastName);
    const password = generatePassword(8);

    const hashedPassword = await bcrypt.hash(password, 10);

    driver.username = username;
    driver.password = hashedPassword;

    const driverModel = new DriverModel(driver);
    const savedDriver = await driverModel.save();

    await sendEmail(driver.email, 'Your Account Details', `Your account has been created successfully.\nUsername: ${username}\nPassword: ${password}`);

    const response = { statusCode: 201, msg: "created successfully", data: savedDriver._id };
    res.status(201).send(response);
});

/**
 * get all drivers
 */
exports.getAllDrivers = tryCatch(async (req, res) => {
    const drivers = await DriverModel.find();
    const response = { statusCode: 200, msg: "OK", data: drivers };
    res.status(200).send(response);
});

/**
 * get a driver
 */
exports.getDriver = tryCatch(async (req, res) => {
    const driver = await DriverModel.findOne({ _id: req.params.id });

    if (!driver) {
        const errorResponse = { statusCode: 400, msg: `${req.params.id} driver not found!` };
        return res.status(404).send(errorResponse);
    }
    const response = { statusCode: 200, msg: "OK", data: driver };
    res.status(200).send(response);
});

/**
 * update a driver
 */
exports.updateDriver = tryCatch(async (req, res) => {
    const driverId = req.params.id;
    console.log(req.body);
    const updateFields = {};
    const originalFields = {};

    if (req.body.email) {
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        updateFields.email = req.body.email;
    }
    if (req.body.firstName) updateFields.firstName = req.body.firstName;
    if (req.body.lastName) updateFields.lastName = req.body.lastName;
    if (req.body.nic) updateFields.nic = req.body.nic;
    if (req.body.gender) {
        if (!['Male', 'Female', 'Other'].includes(req.body.gender)) {
            return res.status(400).json({ error: 'Invalid gender' });
        }
        updateFields.gender = req.body.gender;
    }
    if (req.body.dob) updateFields.dob = new Date(req.body.dob);
    if (req.body.contactNo) {
        if (!/^\d{10}$/.test(req.body.contactNo)) {
            return res.status(400).json({ error: 'Invalid phone number' });
        }
        updateFields.contactNo = req.body.contactNo;
    }
    if (req.body.licenseNo) updateFields.licenseNo = req.body.licenseNo;
    if (req.body.licenseExpireDate) updateFields.licenseExpireDate = new Date(req.body.licenseExpireDate);
    if (req.body.medicalIssues) updateFields.medicalIssues = req.body.medicalIssues;
    if (req.body.availability !== undefined) updateFields.availability = req.body.availability;
    if (req.body.isActive !== undefined) updateFields.isActive = req.body.isActive;
    
    try {
        const driver = await DriverModel.findOneAndUpdate(
            { _id: driverId },
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        // Send email with the updated data
        await sendEmail(driver.email || updateFields.email, 'Your Information Has Been Updated', `Your information has been updated with the following details:\n${JSON.stringify(updateFields, null, 2)}`);

        return res.status(200).json({ status: true, message: 'Driver updated successfully', data: driver });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});



/**
 * delete a driver
 */
exports.deleteDriver = tryCatch(async (req, res) => {
    console.log(req.params);

    const driver = await DriverModel.findOne({ _id: req.params.id });
    if (!driver) {
        const errorResponse = { statusCode: 404, msg: `${req.params.id} driver not found!` };
        return res.status(404).send(errorResponse);
    }
    await DriverModel.findByIdAndDelete({ _id: req.params.id });

    // Send email to the driver notifying about the deletion
    await sendEmail(driver.email, 'Account Deletion', 'Your account has been deleted from our system.');

    res.status(204).send();
});

exports.toggleDriverStatus = tryCatch(async (req, res) => {
    const driverId = req.params.id;
    const driver = await DriverModel.findOne({ _id: driverId });

    if (!driver) {
        return res.status(404).json({ error: 'Driver not found' });
    }

    driver.isActive = !driver.isActive;

    const updatedDriver = await driver.save();

    // Send email to notify the driver about the status change
    await sendEmail(driver.email, 'Account Status Change', `Your account status has been changed to ${driver.isActive ? 'Active' : 'Inactive'}.`);

    res.status(200).json({ status: true, message: `Driver ${driver.isActive ? 'activated' : 'deactivated'} successfully`, data: updatedDriver });
});




/**
 * Driver Mobile app Functions
 */
exports.login = tryCatch(async (req, res) => {
  const { username, password } = req.body;

    const driver = await DriverModel.findOne({ username});
    console.log(driver);

    if (!driver) {
      return res.status(400).json({ error: 'User not registered.' });
    }

    const isPasswordValid = await bcrypt.compare(password, driver.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ username: driver.username }, process.env.KEY, { expiresIn: '3h' ,});
   
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

    return res.status(200).json({ status: true, message: 'Logged in successfully' , token: token, data: driver});
  
});



exports.forgotPassword = tryCatch(async (req, res) => {
  const { email } = req.body;

  
    const driver = await DriverModel.findOne({ email });
    if (!driver) {
      return res.status(400).json({ message: 'Passenger not registered.' });
    }

    const token = jwt.sign({ username: driver.username }, process.env.KEY, { expiresIn: '25m', });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rajasooriyakavindhya@gmail.com",
            pass: "necv biwv lruw dvpy",
        },
    });
    
    const mailOptions = {
        from: "rajasooriyakavindhya@gmail.com",
        to: email,
        subject: "Reset Password",
        text: `http://127.0.0.1:5173/rpassword/${token}` // problem in path
        

    };
    
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            return res.status(401).json({ message: "Email not sent" });
        } else {
            return res.status(200).json({ status: true, message: "Email sent" });
        }
    });

    
  
});


exports.resetPassword = tryCatch(async (req, res) => {
  const {token} = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    
    await DriverModel.findByIdAndUpdate(id, { password: hashPassword });
    
    return res.status(200).json({ status: true, message: "Password reset successfully" });
} catch (err) {
    console.log(err);
    return res.json({ message: "Password reset failed" });
}
});

exports.verify = tryCatch(async (req, res) => {
    return res.json({ status: true, message: "User is verified" });
});


exports.logout = tryCatch(async(req, res) => {
    res.clearCookie('token');
    return res.status(204).json({ status: true, message: 'Logged out successfully.' });
});




// Get Passenger by ID
exports.getDriverByEmail = tryCatch(async (req, res) => {
  const { email } = req.params;
  console.log(`Received request to fetch passenger by email: ${email}`);

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const driver = await DriverModel.findOne({ email });
  console.log(`Driver: ${driver}`);
  if (!driver) {
    const errorResponse = { statusCode: 400, msg: `Passenger with email ${email} not found!` };
    return res.status(404).json(errorResponse);
  }

  const response = { statusCode: 200, msg: "OK", data: driver };
  res.status(200).send(response);
});
