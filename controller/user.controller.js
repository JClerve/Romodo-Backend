const tryCatch = require("../utils/TryCatch");
const { Request, Response } = require("express");
const { StandardResponse } = require("../dto/StandardResponse");
//const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../types/SchemaTypes");
const UserModel = require("../model/user.model");
//const router = express.Router();

// Route for user registration
exports.signup = tryCatch(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();

  return res
    .status(201)
    .json({ status: true, message: "User created the account successfully" });
});

exports.login = tryCatch(async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "24h",
  });

  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  return res.status(200).json({
    status: true,
    message: "User logged in successfully",
    token: token,
  });
});

exports.forgotPassword = tryCatch(async (req, res) => {
  console.log('Received request body:', req.body); // Debug log

  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    console.log('Found user:', user); // Debug log
    
    if (!user) {
      return res.status(404).json({ message: "No user found with this email address" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "25m",
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "clervejoeson@gmail.com", // Use your email
        pass: "wcwr yhjm nviv otvz", // Use your app password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const resetLink = `http://localhost:5173/resetPassword/${token}`;
    
    const mailOptions = {
      from: "clervejoeson@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset Request</h2>
        <p>Please click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 25 minutes.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({
      status: true,
      message: "Password reset link has been sent to your email"
    });
    
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res.status(500).json({
      status: false,
      message: "Failed to process password reset request",
      error: error.message
    });
  }
});

// Route for resetting the password
exports.resetPassword = tryCatch(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);

    await UserModel.findByIdAndUpdate(id, { password: hashPassword });

    return res.json({ status: true, message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Password reset failed" });
  }
});

// Middleware to verify the user

// Route to verify the user
exports.verify = tryCatch(async (req, res) => {
  return res.json({ status: true, message: "User is verified" });
});

// // Route to logout the user
// exports.logout = tryCatch (async (req, res) => {
//     //res.clearCookie("token");  becouse of cors error do this
//     return res.json({ status: true, message: "User logged out successfully" });
// });

exports.logout = tryCatch(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
    domain: "localhost",
  });

  return res
    .status(200)
    .json({ status: true, message: "User logged out successfully" });
});
