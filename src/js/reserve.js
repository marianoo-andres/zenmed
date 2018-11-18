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
                    reserveButton.innerHTML = 'La reservación del turno fue realizada con éxito!';
                } else {
                    reserveButton.style.backgroundColor = '#db2e2e';
                    reserveButton.innerHTML = 'Error en la reservación del turno!';
                }
                window.zenmed = data;
                document.querySelector("#close-take-date-button").click()
                document.querySelector("#historial-turnos-link").click()
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}


const dateId = document.querySelector("#hd_reg_date_id"),
    deleteForm = document.querySelector("#delete-date-form"),
    deleteDateButton = document.querySelector("#delete-date-button"),
    cancelDeleteDateButton = document.querySelector("#cancel-delete-button")

if (deleteForm) {
    deleteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: `http://localhost:3000/reservedDates/${dateId.value}`,
            method: 'delete',
            success: function (data) {
                if (data.ok) {
                    deleteDateButton.style.backgroundColor = '#ff5e3a';
                    deleteDateButton.innerHTML = 'El turno fue cancelado!';
                    cancelDeleteDateButton.innerText = "Ok";
                } else {
                    deleteDateButton.style.backgroundColor = '#db2e2e';
                    deleteDateButton.innerHTML = 'Error en la cancelación del turno!';
                }
                window.zenmed = data;
                document.querySelector("#cancel-delete-button").click()
                document.querySelector("#historial-turnos-link").click() 
            },
            error: function (err) {

            }
        });
    });
}