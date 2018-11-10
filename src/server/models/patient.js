'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    cuit: { type: String, required: true },
    birthdate: { type: Date, required: true },
    address: { 
        street: { type: String },
        number: { type: String },
        department: { type: String },
        province: { type: String }
    },
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