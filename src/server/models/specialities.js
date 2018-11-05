'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecialitySchema = new Schema({
    description: { type: String, index: { unique: true } },
    Created_date: { type: Date, default: Date.now }
});
  
module.exports = mongoose.model('Specialities', SpecialitySchema);