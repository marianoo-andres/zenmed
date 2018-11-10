'use strict';

var mongoose = require('mongoose'),
  Patients = mongoose.model('Patients');

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

