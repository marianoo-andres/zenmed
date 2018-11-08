'use strict';
module.exports = function(app) {
  var userList = require('../controllers/users.controller');

  app.route('/users')
    .get(userList.list_all_users)
    .post(userList.create_a_user);


  app.route('/users/:userId')
    .get(userList.read_a_user)
    .put(userList.update_a_user)
    .delete(userList.delete_a_user);

  app.route('/users/login')
    .post(userList.login)

  var doctorList = require('../controllers/doctors.controller');

  app.route('/doctors')
    .get(doctorList.list_all_doctors)
    .post(doctorList.create_a_doctor);


  app.route('/doctors/:doctorId')
    .get(doctorList.read_a_doctor)
    .put(doctorList.update_a_doctor)
    .delete(doctorList.delete_a_doctor);


  var specialitiList = require('../controllers/specialities.controller');

  app.route('/specialities')
    .get(specialitiList.list_all_specialities)
    .post(specialitiList.create_a_speciality);//TODO: dev only


  app.route('/specialities/:specialityId')
    .put(specialitiList.update_a_speciality) //TODO: dev only
    .delete(specialitiList.delete_a_speciality); //TODO: dev only
};
