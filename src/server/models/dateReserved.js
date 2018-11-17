'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DateReservedSchema = new Schema({
    patientId: {type: mongoose.Schema.Types.ObjectId, required: true},
    doctorId: {type: mongoose.Schema.Types.ObjectId, required: true},
    datetime: { type: Date, required: true },
    Created_date: { type: Date, default: Date.now }
});
  
module.exports = mongoose.model('DateReserved', DateReservedSchema);