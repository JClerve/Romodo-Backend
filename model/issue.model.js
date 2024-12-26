// models/issue.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const issueSchema = new Schema({
  incidentType: {
    type: String,
    enum: ['Malfunction', 'Accident'],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rerouting: {
    type: Boolean,
    required: true
  },
  reroutingNewVehicleNo: {
    type: String,
    required: function() { return this.rerouting === true; }
  },
  reroutingNewDriverNo: {
    type: String,
    required: function() { return this.rerouting === true; }
  }
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
