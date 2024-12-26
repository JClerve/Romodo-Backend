const { Schema, model } = require('mongoose');

const TripSchema = new Schema({
  driverId: { type: Schema.Types.ObjectId, ref: 'Driver' },
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
  status: { type: Boolean, default: true }, // Default to scheduled (true)
  destinationLocation: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Destination',
  },
  date: { type: Date, required: true }, // This date indicates the trip scheduled date.
  startTime: { type: Date, required: function() { return this.status; } }, // Required for scheduled trips
  endTime: { type: Date, required: function() { return this.status; } }, // Required for completed trips
}, { timestamps: true });

const Trip = model('Trip', TripSchema);
module.exports = Trip;
