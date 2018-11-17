var moment = require('moment');

var getDates = function(dateFrom, dateTo, dateFormat, duration, startTime, endTime, availableDays) {
	// availableDays ['1','2','3','4','5','6','7'] 1=Monday .. 7=Sunday
	// startTime/endTime '09:30'
	// duration 60 (in minutes)
	// dateFrom - dateTo '16/11/2018' with dateFormat 'DD/MM/YYYY'
	format = dateFormat
	availableDates = []
	startTimeHour = parseInt(startTime.split(':')[0]);
	startTimeMinute = parseInt(startTime.split(':')[1]);
	endTimeHour = parseInt(endTime.split(':')[0]);
	endTimeMinute = parseInt(endTime.split(':')[1]);

	endDate = moment(dateTo, format);
	currentDate = moment(dateFrom, format);
	while (currentDate <= endDate) {
		currentWeekDay = currentDate.format('E');
		if (availableDays.includes(currentWeekDay)) {
			endTime = currentDate.clone();
			endTime.add(endTimeHour, 'hours');
			endTime.add(endTimeMinute, 'minutes');

			current = currentDate.clone();
			current.add(startTimeHour, 'hours');
			current.add(startTimeMinute, 'minutes');

			while (true) {
				availableDates.push(current.clone());
				currentClone = current.clone();
				currentClone.add(duration*2, 'minutes');
				if (currentClone > endTime) break;
				current.add(duration, 'minutes');
			}
		}
		
		currentDate.add(1, 'day');
	}
	return availableDates;
	

};

availableDates = getDates('1/11/2018', '30/11/2018', 'DD/MM/YYYY', 60, '09:30', '11:30', ['1', '2', '5']);
console.log(availableDates);

