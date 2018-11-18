'use strict';
var moment = require('moment');
var mongoose = require('mongoose');
var DateReserved = mongoose.model('DateReserved');
var messageHandler = require('../handlers/message.handler');
var Doctor = mongoose.model('Doctors');
var Patients = mongoose.model('Patients');

exports.create_reserved_date = function(req, res) {

  var momentDate = moment(req.body.date, 'DD/MM/YYYY');
  var timeHour = parseInt(req.body.time.split(':')[0]);
  var timeMinute = parseInt(req.body.time.split(':')[1]);
  momentDate.add(timeHour, 'hours');
  momentDate.add(timeMinute, 'minutes');
  var reservedDate = {};
  reservedDate.patientId = req.body.patientId;
  reservedDate.doctorId = req.body.doctorId;
  reservedDate.datetime = momentDate.format();

  var newReservedDate = new DateReserved(reservedDate);
  newReservedDate.save().then(function (result) {
        res.json(messageHandler.ok());
      }, function (error) {
        res.send(messageHandler.error(error));
      });
};

function getAvailableDates(dateFrom, dateTo, dateFormat, duration, startTime, endTime, availableDays) {
	// availableDays ['1','2','3','4','5','6','7'] 1=Monday .. 7=Sunday
	// startTime/endTime '09:30'
	// duration 60 (in minutes)
  // dateFrom - dateTo '16/11/2018' with dateFormat 'DD/MM/YYYY'
  duration = parseInt(duration);
	var format = dateFormat;
	var availableDates = [];
	var startTimeHour = parseInt(startTime.split(':')[0]);
	var startTimeMinute = parseInt(startTime.split(':')[1]);
	var endTimeHour = parseInt(endTime.split(':')[0]);
	var endTimeMinute = parseInt(endTime.split(':')[1]);

	var endDate = moment(dateTo, format);
	var currentDate = moment(dateFrom, format);
	while (currentDate <= endDate) {
		var currentWeekDay = currentDate.format('E');
		if (availableDays.includes(currentWeekDay)) {
			var endTime = currentDate.clone();
			endTime.add(endTimeHour, 'hours');
			endTime.add(endTimeMinute, 'minutes');

			var current = currentDate.clone();
			current.add(startTimeHour, 'hours');
			current.add(startTimeMinute, 'minutes');

			while (true) {
				availableDates.push(current.clone());
				var currentClone = current.clone();
				currentClone.add(duration*2, 'minutes');
				if (currentClone > endTime) break;
				current.add(duration, 'minutes');
			}
		}
		
		currentDate.add(1, 'day');
	}
	return availableDates;
};

function sortAvailableDates(a, b) {
  if (a.date < b.date) {            // a comes first
      return -1;
  } else if (b.date < a.date) {     // b comes first
      return 1;
  } else {                
      return 0;            
  }
}

function filterNotAvailableDates(availableDates, reservedDates) {
  var filtered = [];
  availableDates.forEach(availableDate => {
    if (dateIsAvailable(availableDate, reservedDates)) {
      filtered.push(availableDate);
    }
  });
  return filtered;
}

function dateIsAvailable(availableDate, reservedDates) {
  for (var i = 0; i < reservedDates.length; i++) {
    if (availableDate.doctor.id.toString() === reservedDates[i].doctorId.toString()) {
      if (availableDate.date.toString() === (moment(reservedDates[i].datetime).toString())) {
        return false;
      }
    }  
  }
  return true;
}


exports.get_available_dates = function(req, res) {
  var daysToAdd = parseInt(req.params.days);
  var format = 'DD/MM/YYYY'
  var fromDate = moment().format(format);
  var toDate = moment().add(daysToAdd, 'days').format(format);
  var doctors;
  var availableDates = [];
  var reservedDates = [];

  var promises = [
    DateReserved.find().then(function (dates) {
      reservedDates = dates;
    }),

    Doctor.find()
    .then(function (result) {
      doctors = result;
    })
  ];
  Promise.all(promises)
    .then(function () {
      doctors.forEach(doctor => {
        var dates = getAvailableDates(fromDate, toDate, format, doctor.duration, doctor.startTime, doctor.endTime, doctor.availableDays);
        dates.forEach(date => {
          availableDates.push({
            doctor: {
              id: doctor.id,
              name: doctor.name,
              speciality: doctor.specialities
            },
            date: date  
          })
        });
      });
    })
    .then(function () {
      availableDates.sort(sortAvailableDates);
      availableDates = filterNotAvailableDates(availableDates, reservedDates);
      availableDates.map(element => {
        element.time = element.date.format('HH:mm');
        element.date = element.date.format('DD/MM/YYYY');
        return element;
      })
      res.json(availableDates);
    })
};

exports.get_patient_reserved_dates = function(req, res) {
  DateReserved.find({patientId: req.params.id}).sort({datetime: 1})
  .then(function (result) {
    var dates = [];
    var promises = []
    result.forEach(element => {
      promises.push(Doctor.findById(element.doctorId))
    });

    Promise.all(promises).then(doctors => {
      for (var i = 0; i < result.length; i++) {
        doctor = doctors[i];
        var doctor = {
          name: doctor.name,
          speciality: doctor.specialities
        };
        var momentDate = moment(result[i].datetime); 
        dates.push({
          _id: result[i].id,
          doctor: doctor,
          date: momentDate.format('DD/MM/YYYY'),
          time: momentDate.format('HH:mm')
        });
      }
      res.json(dates);
    });

  })
  .catch(function (error) {
    res.send(messageHandler.error(error));
    console.log(error);
  })
};

exports.delete_patient_reserved_date = function(req, res) {
  DateReserved.deleteOne({_id: req.params.id})
    .then(function () {
      res.json(messageHandler.ok('reserved date successfully deleted'));
    })
    .catch(function (error) {
      res.send(messageHandler.error(error));
      console.log(error);
    });
};

exports.get_doctor_reserved_dates = function(req, res) {
  DateReserved.find({doctorId: req.params.id}).sort({datetime: 1})
  .then(function (result) {
    var dates = [];
    var promises = []
    result.forEach(element => {
      promises.push(Patients.findById(element.patientId))
    });

    Promise.all(promises).then(pacients => {
      for (var i = 0; i < result.length; i++) {
        pacient = pacients[i];
        var pacient = {
          name: pacient.name,
          email: pacient.email,
          phoneNumber: pacient.phoneNumber,
          dni: pacient.dni
        };
        var momentDate = moment(result[i].datetime); 
        dates.push({
          _id: result[i].id,
          pacient: pacient,
          date: momentDate.format('DD/MM/YYYY'),
          time: momentDate.format('HH:mm')
        });
      }
      res.json(dates);
    });

  })
  .catch(function (error) {
    res.send(messageHandler.error(error));
    console.log(error);
  })
};

