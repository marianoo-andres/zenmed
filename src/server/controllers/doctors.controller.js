'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  Doctor = mongoose.model('Doctors'),
  DateReserved = mongoose.model('DateReserved'),
  messageHandler = require('../handlers/message.handler');

exports.list = function(req, res) {
  var filters = {}

  if(req.params.speciality){
    filters['specialities'] = req.params.speciality
  }

  Doctor.find(filters, function(err, doctor) {
    if (err)
      res.send(err);
    else 
      res.json(doctor);
  });
};

exports.create_a_doctor = function(req, res) {
  var new_doctor = new Doctor(req.body);
  new_doctor.save(function(err, doctor) {
    if (err)
      res.send(err);
    else 
      res.json(doctor);
  });
};


exports.read_a_doctor = function(req, res) {
  Doctor.findById(req.params.id, function(err, doctor) {
    if (err)
      res.send(err);
    else 
      res.json(doctor);
  });
};


exports.update_a_doctor = function(req, res) {
  Doctor.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, doctor) {
    if (err)
      res.send(err);
    else 
      res.json(doctor);
  });
};


exports.delete_a_doctor2 = function(req, res) {  
  Doctor.findById(req.params.doctorId, function(err, doctor){
    User.deleteOne({ username : doctor.username }, function(err, user){
      Doctor.deleteOne({_id: req.params.doctorId }, function(err, doctor) {
        if (err)
          res.send(messageHandler.error(err));
        else 
          res.json(messageHandler.ok('doctor successfully deleted'));
      });
    })
  })
};


exports.delete_a_doctor = function(req, res) {
  Doctor.findById(req.params.id)
    .then(function (doctor) {
      console.log(doctor);
      User.deleteOne({ username: doctor.username})
        .then(function () {
          console.log("Delete one doctor");
          Doctor.deleteOne({_id: req.params.id})
            .then(function () {
              console.log("Delete datereserved");
              DateReserved.deleteMany({doctorId: req.params.id})
                .then(function () {
                  console.log("LLEGUE ACA");
                  res.json(messageHandler.ok('doctor successfully deleted'));
              })
            })
        })
    })
    .catch(function (error) {
      res.send(messageHandler.error(error));  
    })
};
