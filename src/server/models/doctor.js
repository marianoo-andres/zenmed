'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    specialities: { type: String, required: true},
    duration: { type: String},
    availableDays: {type: Array, 'default': ['1', '2', '3', '4', '5']}, // ['1','2','3','4','5'] Lunes='1' ... Viernes='5'
    startTime: { type: String}, // Por ejemplo: '09:30'
    endTime: { type: String}, // Por ejemplo: '18:20'
    
    Created_date: { type: Date, default: Date.now, required: true }
});
  
module.exports = mongoose.model('Doctors', DoctorSchema);