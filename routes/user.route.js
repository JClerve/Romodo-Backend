const express = require('express');
//const router = express.Router();
const { Router } = require("express");
const {login , forgotPassword , resetPassword , verify , logout , signup} = require('../controller/user.controller');
const verifyUser = require('../middlewares/verifyUser'); // Adjust the path as necessary

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword/:token", resetPassword);

router.get("/verify", verifyUser, verify);



//router.get("/logout", logout);
router.post("/logout", logout);  // Changed from GET to POST


module.exports = router;
