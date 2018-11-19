'use strict';

const $ = require('jquery'),
    app = require('./app.core'),
    doctorRegistrationForm = document.querySelector('#doctor-registration-form'),
    username = document.querySelector('#zm_doctor_username'),
    password = document.querySelector('#zm_doctor_password'),
    name = document.querySelector('#zm_doctor_name'),
    registrationNumber = document.querySelector('#zm_registration_number'),
    duration = document.querySelector('#zm_appointment_duration'),
    startTime = document.querySelector('#zm_start_time'),
    endTime = document.querySelector('#zm_end_time'),
    specialty = document.querySelector('#zm_specialty'),
    createMedicButton = document.querySelector('#crear-medico-button');

if (doctorRegistrationForm) {
    doctorRegistrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = {
            username: username.value,
            password: password.value,
            role: 'Doctor',
            name: name.value,
            registrationNumber: registrationNumber.value,
            specialities: specialty.value,
            duration: duration.value,
            startTime: startTime.value,
            endTime: endTime.value
        };

        $.ajax({
            url: 'http://localhost:3000/users/register',
            method: 'post',
            data: data,
            success: function(data) {
                if (data.ok) {
                    app.loader.show('Cargando');
                    window.setTimeout(() => {
                        document.location.reload();
                    }, 2000);

                } else {
                    createMedicButton.style.backgroundColor = '#db2e2e';
                    createMedicButton.innerHTML = 'Error de registracion!';
                }
            },
            error: function(data) {
                createMedicButton.style.backgroundColor = '#db2e2e';
                createMedicButton.innerHTML = 'Error de registracion!';
            }
        });
    });
}