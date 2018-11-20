'use strict';
module.exports = function(app) {
  var datesList = require('../controllers/dates.controller');
  app.route('/dates/available')
   .get(datesList.list_available_dates)


  var userList = require('../controllers/users.controller');

  app.route('/users')
    .get(userList.list_all_users)

  app.route('/users/register')
    .post(userList.create_a_user);


  app.route('/users/:userId')
    .get(userList.read_a_user)
    .put(userList.update_a_user)
    .delete(userList.delete_a_user);

  app.route('/users/login')
    .post(userList.login)

  var doctorList = require('../controllers/doctors.controller');

  app.route('/doctors/:speciality')
    .get(doctorList.list)

  app.route('/doctors')
    .get(doctorList.list)
    .post(doctorList.create_a_doctor);


  app.route('/doctors/:id')
    .put(doctorList.update_a_doctor)
    .delete(doctorList.delete_a_doctor);
  
  app.route('/doctor/:id')
    .get(doctorList.read_a_doctor)


  var specialitiList = require('../controllers/specialities.controller');

  app.route('/specialities')
    .get(specialitiList.list_all_specialities)
    .post(specialitiList.create_a_speciality);
    
  app.route('/specialities/:specialityId')
    .put(specialitiList.update_a_speciality) //TODO: dev only
    .delete(specialitiList.delete_a_speciality); //TODO: dev only


  var patientsList = require('../controllers/patients.controller');

  app.route('/patient/:id')
    .get(patientsList.read_a_patient)
    .put(patientsList.update_a_patient)
    .delete(patientsList.delete_a_patient)
    
  app.route('/patients').get(patientsList.list)
  
  var db = require('../controllers/create-db.controller');
  app.route('/all/create').get(db.create_all)
  app.route('/all/delete').get(db.delete_all)
  
  var datesReservedController = require('../controllers/datesReserved.controller');
  app.route('/availableDates/:days').get(datesReservedController.get_available_dates);
  app.route('/reservedDates/create').post(datesReservedController.create_reserved_date);
  app.route('/reservedDates/patients/:id').get(datesReservedController.get_patient_reserved_dates);
  app.route('/reservedDates/:id').delete(datesReservedController.delete_patient_reserved_date);
  app.route('/reservedDates/doctors/:id').get(datesReservedController.get_doctor_reserved_dates);
  

};
