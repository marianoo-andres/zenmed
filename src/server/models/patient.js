'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    dni: { type: String, required: true },
    birthdate: { type: Date, required: true },

    dates: [
        {
            doctor: { type: String, required: true },
            dateTime: { type: Date, required: true },
            speciality: { type: String, required: true },
            canceled: { type: Boolean, default: false }
        }
    ],
    Created_date: { type: Date, default: Date.now, required: true }
});
  
module.exports = mongoose.model('Patients', PatientSchema);