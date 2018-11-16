'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    specialities: [ { description: { type: String, required: true} } ],
    
    Created_date: { type: Date, default: Date.now, required: true }
});
  
module.exports = mongoose.model('Doctors', DoctorSchema);