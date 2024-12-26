// models/Passenger.js

const {model, Schema} = require("mongoose");

const passengerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,

  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  nicNo: {
    type: String,
    required: true,
    unique: true,
  },

  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  
  isInternal: {
    type: Boolean,
    default: false, // Assuming default is external passenger
  },
  companyName: {
    type: String,
    required: function () {
      return this.isInternal;
    },
  },
  serviceNo: {
    type: String,
    required: function () {
      return this.isInternal;
    },
  },
  contactNo: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
 
  
});

const PassengerModel = model("Passenger", passengerSchema);

module.exports = PassengerModel;