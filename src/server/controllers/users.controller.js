'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('Users');

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
    if (err)
      res.send(err);
    res.json(user);
  });
};


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
