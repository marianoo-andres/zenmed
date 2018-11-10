'use strict';

var mongoose = require('mongoose'),
  Specialities = mongoose.model('Specialities'),
  Doctors = mongoose.model('Doctors'),
  messageHandler = require('../handlers/message.handler');

exports.list_all_specialities = function(req, res) {
  Specialities.find({}, function(err, specialities) {
    if (err)
      res.send(messageHandler.error(err));
    res.json(messageHandler.ok(specialities));
  });
};

exports.create_a_speciality = function(req, res) {
  var new_speciality = new Specialities(req.body);
  new_speciality.save(function(err, speciality) {
    if (err)
      res.send(messageHandler.error(err));
    else
      res.json(messageHandler.ok(speciality))
  });
};

exports.update_a_speciality = function(req, res) {  
  let oldSpeciality = {}
  Specialities.findOne({_id: req.params.specialityId}, function(err, speciality){
    oldSpeciality = speciality
  
    Specialities.findOneAndUpdate({_id: req.params.specialityId}, req.body, {new: true}, function(err, speciality) {
      if (err){
        res.send(messageHandler.error(err));
        return
      }
      
      Doctors.find({'specialities.description': oldSpeciality.description}, function(err, doctors){
        doctors = doctors || []
        doctors.forEach(d => {
          Doctors.update({'specialities.description': oldSpeciality.description }, 
            {'$set': { 'specialities.$.description': req.body.description }}, function(err){

            })
        })
      })
      res.json(messageHandler.ok())              
    });
  })
};


exports.delete_a_speciality = function(req, res) {
  let oldSpeciality = {}
  Specialities.findOne({_id: req.params.specialityId}, function(err, speciality){
    oldSpeciality = speciality
    
    Specialities.deleteOne({_id: req.params.specialityId}, function(err, speciality) {
      if (err){
        res.send(messageHandler.error(err));
        return
      }
      
      Doctors.findOneAndUpdate({'specialities.description': oldSpeciality.description},
        { $pull:{'specialities': { description: oldSpeciality.description} } },
        function(err, doctors){
        
      })
      res.json(messageHandler.ok())              
    });
  })
};
