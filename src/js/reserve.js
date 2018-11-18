'use strict';

const $ = require('jquery'),
    app = require('./app.core'),
    takeDateForm = document.querySelector("#take-date-form"),
    doctorId = document.querySelector("#zm_reg_id_doctor"),
    fecha = document.querySelector("#hd_reg_fecha"),
    hora = document.querySelector("#hd_reg_hora"),
    reserveButton = document.querySelector('#take-date-button');

if (takeDateForm) {
    takeDateForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const data = {
            patientId: app.cookies.getCookie('user-id'),
            doctorId: doctorId.value,
            date: fecha.value,
            time: hora.value
        };

        $.ajax({
            url: 'http://localhost:3000/reservedDates/create',
            method: 'post',
            data: data,
            success: function (data) {
                if (data.ok) {
                    reserveButton.style.backgroundColor = '#ff5e3a';
                    reserveButton.innerHTML = 'La reservación fue realizada con éxito!';
                } else {
                    reserveButton.style.backgroundColor = '#db2e2e';
                    reserveButton.innerHTML = 'Error en la reservación!';
                }
                window.zenmed = data;
                app.loadPage({ template: 'dashboard.html' });
            },
            error: function(err){

            }
        });
    });
}