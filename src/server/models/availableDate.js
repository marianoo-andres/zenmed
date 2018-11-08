'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvailableDateSchema = new Schema({
    doctor: { type: String, required: true },
    dateTime: { type: Date, required: true },
    speciality: { type: String, required: true },
    Created_date: { type: Date, default: Date.now }
});
  
module.exports = mongoose.model('AvailableDates', AvailableDateSchema);