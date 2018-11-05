'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    cuit: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    specialities: [
        {
            type: String,
            required: true
        }
    ],
    address: {
        street: {
            type: String
        },
        number: {
            type: String
        },
        department: {
            type: String
        },
        province: {
            type: String
        }
    },
    Created_date: {
        type: Date,
        default: Date.now,
        required: true
    }
});
  
module.exports = mongoose.model('Doctors', DoctorSchema);