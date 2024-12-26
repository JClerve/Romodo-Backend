const { model, Schema } = require("mongoose");
const CounterModel = require('./counter.model');


const driverSchema = new Schema({
    
    no: {
        type: String,
        //required: false,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    dob: {
        type: Date,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    licenseNo: {
        type: String,
        required: true,
        unique: true
    },
    licenseExpireDate: {
        type: Date,
        required: true
    },
    medicalIssues: {
        type: String,
        default: ""
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true,
    },
    isActive: {
    type: Boolean,
    default: true,
  },
    
}, { timestamps: true });

driverSchema.pre('save', async function (next) {
    const driver = this;
    const counter = await CounterModel.findByIdAndUpdate(
      { _id: 'driverNo' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    driver.no = `D${counter.seq.toString().padStart(3, '0')}`;
    next();
  });

const DriverModel = model("Driver", driverSchema);

module.exports = DriverModel;