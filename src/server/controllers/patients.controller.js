'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  Patients = mongoose.model('Patients'),
  moment = require('moment'),
  messageHandler = require('../handlers/message.handler');

exports.read_a_patient = function(req, res) {
  Patients.findById(req.params.id, function(err, patient) {
    if (err) {
      res.send(err);
    }
    else {
      var p = JSON.parse(JSON.stringify(patient));
      p.birthdate = moment(p.birthdate).format('DD/MM/YYYY');
      res.json(p);
    }
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
  if (req.body.birthdate) {
    req.body.birthdate = moment(req.body.birthdate, 'DD/MM/YYYY').format('MM-DD-YYYY');
  }
  Patients.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, patient) {
    if (err) {
      res.send(err);
    }
    else {
      var p = JSON.parse(JSON.stringify(patient));
      p.birthdate = moment(p.birthdate).format('DD/MM/YYYY');
      res.json(p);
    }
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
