'use strict';

var mongoose = require('mongoose'),
  Doctor = mongoose.model('Doctors');

exports.list = function(req, res) {
  var filters = {}

  if(req.params.speciality){
    filters['specialities.description'] = req.params.speciality
  }

  Doctor.find(filters, function(err, doctor) {
    if (err)
      res.send(err);
    res.json(doctor);
  });
};

exports.create_a_doctor = function(req, res) {
  var new_doctor = new Doctor(req.body);
  new_doctor.save(function(err, doctor) {
    if (err)
      res.send(err);
    res.json(doctor);
  });
};


exports.read_a_doctor = function(req, res) {
  Doctor.findById(req.params.doctorId, function(err, doctor) {
    if (err)
      res.send(err);
    res.json(doctor);
  });
};


exports.update_a_doctor = function(req, res) {
  Doctor.findOneAndUpdate({_id: req.params.doctorId}, req.body, {new: true}, function(err, doctor) {
    if (err)
      res.send(err);
    res.json(doctor);
  });
};


exports.delete_a_doctor = function(req, res) {


  Doctor.deleteOne({
    _id: req.params.doctorId
  }, function(err, doctor) {
    if (err)
      res.send(err);
    res.json({ message: 'doctor successfully deleted' });
  });
};
