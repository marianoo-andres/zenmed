'use strict';

var mongoose = require('mongoose'),
  AvailableDates = mongoose.model('AvailableDates');

exports.list_available_dates = function(req, res) {
  var filter = {}
  if(req.params.doctor){
    filter.doctor = { $eq: req.params.doctor }
  }

  if(req.params.speciality){
    filter.speciality = { $eq: req.params.speciality }
  }

  if(req.params.dateFrom){
    filter.date = { $gt: req.params.dateFrom }
  }else {
    filter.date = { $gt: new Date() }
  }

  AvailableDates.find(filter, function(err, available_dates) {
    if (err)
      res.send(err);
    res.json(available_dates);
  });
};

exports.create_a_available_dates = function(req, res) {
  var new_available_dates = new AvailableDates(req.body);
  new_available_dates.save(function(err, available_dates) {
    if (err)
      res.send(err);
    res.json(available_dates);
  });
};

exports.update_a_available_dates = function(req, res) {
  AvailableDates.findOneAndUpdate({_id: req.params.available_datesId}, req.body, {new: true}, function(err, available_dates) {
    if (err)
      res.send(err);
    res.json(available_dates);
  });
};


exports.delete_a_available_dates = function(req, res) {
  AvailableDates.deleteOne({
    _id: req.params.available_datesId
  }, function(err, available_dates) {
    if (err)
      res.send(err);
    res.json({ message: 'available_dates successfully deleted' });
  });
};
