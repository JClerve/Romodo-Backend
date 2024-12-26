const { model, Schema } = require("mongoose");
const CounterModel = require('./counter.model');

const vehicleSchema = new Schema({
    id : {
        type: String,
       
        unique: true
    },
    no: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    chassisNo: {
        type: String,
        required: true,
        unique: true
    },
    productionYear: {
        type: Date,
        required: true
    },
    ac: {
        type: Boolean,
        default: false
    },
    brand: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    fuelType: {
        type: String,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    }
}, { timestamps: true });

vehicleSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await CounterModel.findByIdAndUpdate(
            { _id: 'vehicleId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.id = `V${counter.seq.toString().padStart(3, '0')}`;
    }
    next();
});

const VehicleModel = model("Vehicle", vehicleSchema);

module.exports = VehicleModel;
