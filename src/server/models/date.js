'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DateSchema = new Schema({
    doctor: { type: String, required: true },
    patient: { type: String, required: true },
    dateTime: { type: Date, required: true },
    speciality: { type: String, required: true },
    canceled: { type: Boolean, default: false },    
    Created_date: { type: Date, default: Date.now }
});
  
module.exports = mongoose.model('Dates', DateSchema);