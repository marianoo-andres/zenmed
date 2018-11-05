'use strict';

var mongoose = require('mongoose'),
  Specialities = mongoose.model('Specialities');

exports.list_all_specialities = function(req, res) {
  Specialities.find({}, function(err, speciality) {
    if (err)
      res.send(err);
    res.json(speciality);
  });
};

exports.create_a_speciality = function(req, res) {
  var new_speciality = new Specialities(req.body);
  new_speciality.save(function(err, speciality) {
    if (err)
      res.send(err);
    res.json(speciality);
  });
};

exports.update_a_speciality = function(req, res) {
  Specialities.findOneAndUpdate({_id: req.params.specialityId}, req.body, {new: true}, function(err, speciality) {
    if (err)
      res.send(err);
    res.json(speciality);
  });
};


exports.delete_a_speciality = function(req, res) {


  Specialities.deleteOne({
    _id: req.params.specialityId
  }, function(err, speciality) {
    if (err)
      res.send(err);
    res.json({ message: 'speciality successfully deleted' });
  });
};
