'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  Patients = mongoose.model('Patients'),
  messageHandler = require('../handlers/message.handler');

exports.list_dates = function(req, res) {
  var filter = { canceled: false, dateTime: new Date() }

  if(req.params.canceled){
    filter.canceled = req.params.canceled
  }
  if(req.params.dateTime){
    filter.dateTime = { $gt: req.params.dateTime }
  }
  
  Patients.find({ username : req.params.username }, function(err, patients) {
    if (err){
      res.send(err);
    } else {
      if(patients){
        res.json(patients[0].dates.filter(d => d.canceled == filter.canceled && d.dateTime >= filter.dateTime ));
      } else {
        res.json([]);
      }
    }
  });
};

exports.read_a_patient = function(req, res) {
  Patients.findById(req.params.id, function(err, patient) {
    if (err)
      res.send(err);
    else 
      res.json(patient);
  });
};

exports.list = function(req, res) {
  Patients.find({}, function(err, patients) {
    if (err)
      res.send(err);
    else 
      res.json(patients);
  });
};

exports.update_a_patient = function(req, res) {
  Patients.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, patient) {
    if (err)
      res.send(err);
    else 
      res.json(patient);
  });
};


exports.delete_a_patient = function(req, res) {  
  Patients.findById(req.params.id, function(err, patient){
    User.deleteOne({ username : patient.username }, function(err, user){
      Patients.deleteOne({_id: req.params.id }, function(err, patient) {
        if (err)
          res.send(messageHandler.error(err));
        else 
          res.json(messageHandler.ok('patient successfully deleted'));
      });
    })
  })
};
