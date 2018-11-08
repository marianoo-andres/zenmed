'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  Doctor = mongoose.model('Doctors'),
  Patient = mongoose.model('Patients');

const ERROR_DUPLICATE_DOCUMENT = 11000

exports.list_all_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (!checkError(res, err, "Username")){
      if(new_user.role == 'Doctor'){
        var new_doctor = new Doctor(req.body)
        new_doctor.save(function(err, doctor){
          if (!checkError(res, err, "Doctor")){
            res.json({ created: true });
          }
        })
      } else if(new_user.role == 'Patient'){
        var new_patient = new Patient(req.body)
        new_patient.save(function(err, patient){
          if (!checkError(res, err, "Patient")){
            res.json({ created: true });
          }
        })
      } else {
        res.send({ created: false, error: 'Role is not valid' });
      }
    }
  });
};

function checkError(res, err, entityName){
  if (err){
    if(err.code == ERROR_DUPLICATE_DOCUMENT){
      res.send({ created: false, error: `${entityName} already exists` });  
    } else {
      res.send({ created: false, error: err });  
    }
    return true
  }
  return false
}


exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.login = function(req, res) {
  User.findOne( { username: req.body.username }, function(err, user) {
    if (err)
      res.send({ isLogged: false, err: err });
    
    if(user){
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        if(isMatch)
          res.json({ isLogged: true, role: user.role });
        else 
          res.json({ isLogged: false });
      });      
    }
  });
};


exports.update_a_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function(req, res) {


  User.deleteOne({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'user successfully deleted' });
  });
};
