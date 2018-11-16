'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  Doctor = mongoose.model('Doctors'),
  Patient = mongoose.model('Patients'),
  messageHandler = require('../handlers/message.handler');

const ERROR_DUPLICATE_DOCUMENT = 11000

exports.list_all_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(messageHandler.error(err));
    res.json(messageHandler.ok(user));
  });
};

exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  console.log(new_user);
  new_user.save().then(function (result) {
    console.log("Usuario creado!");
    console.log(result);
    if (new_user.role == 'Doctor') {
      var new_doctor = new Doctor(req.body);
      new_doctor.save().then(function (result) {
        console.log("Doctor creado!");
        console.log(result);
        res.json(messageHandler.ok());
      }, function (error) {
        res.send(messageHandler.error(error));
      })
    }

    else if (new_user.role == 'Patient') {
      var new_patient = new Patient(req.body);
      new_patient.save().then(function (result) {
        console.log("Paciente creado!");
        console.log(result);
        res.json(messageHandler.ok());
      }, function (error) {
        res.send(messageHandler.error(error));
      })
    }
  }, function (error) {
    res.send(messageHandler.error(error));
  });

  /*new_user.save(function(err, user) {
    if (!checkError(res, err, "Username")){
      if(new_user.role == 'Doctor'){
        var new_doctor = new Doctor(req.body)
        new_doctor.save(function(err, doctor){
          if (!checkError(res, err, "Doctor")){
            res.json(messageHandler.ok());
          }
        })
      } else if(new_user.role == 'Patient'){
        var new_patient = new Patient(req.body)
        new_patient.save(function(err, patient){
          if (!checkError(res, err, "Patient")){
            res.json(messageHandler.ok());
          }
        })
      } else {
        res.send(messageHandler.error('Role is not valid'))
      }
    }
  });*/
};

function checkError(res, err, entityName){
  if (err){
    if(err.code == ERROR_DUPLICATE_DOCUMENT){
      res.send(messageHandler.error(`${entityName} already exists`));  
    } else {
      res.send(messageHandler.error(err));  
    }
    return true
  }
  return false
}


exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    else{
      if(user){
        if (user.role == "Doctor"){
          Doctor.findOne({ username: user.username }, function(err, doctor){
            if (err)
              res.send(err);
            else{
              res.json(doctor);
            }            
          })
        }else if (user.role == "Patient"){
            Patient.findOne({ username: user.username }, function(err, patient){
              if (err)
                res.send(err);
              else{
                res.json(patient);
              }            
            })
        } else {
          res.json(user);
        }
      }
    }
  })
};

exports.login = function(req, res) {  User.findOne( { username: req.body.username }, function(err, user) {
    if (err)
      res.send({ isLogged: false, err: err });
    
    if (user){
      if (user.password === req.body.password) {
        res.json({ isLogged: true, role: user.role });
      }
      else {
        res.json({ isLogged: false });
      } 
    }

    else {
      res.send({ isLogged: false });
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
