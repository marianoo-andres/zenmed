'use strict';

const $ = require('jquery'),
      registerForm = document.querySelector('#register-form'),
      nombre = document.querySelector('#zm_reg_nombre'),
      dni = document.querySelector('#zm_reg_dni'),
      email = document.querySelector('#zm_reg_email'),
      fechanac = document.querySelector('#zm_reg_fechanac'),
      telefono = document.querySelector('#zm_reg_telefono'),
      user = document.querySelector('#zm_reg_user'),
      pwd = document.querySelector('#zm_reg_pwd'),
      pwd2 = document.querySelector('#zm_reg_pwd2');

if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      name: nombre.value,
      dni: dni.value,
      email: email.value,
      birthdate: fechanac.value,
      phoneNumber: telefono.value,
      username: user.value,
      password: pwd.value,
      role: 'Patient'
    };

    $.ajax({
      url: 'http://localhost:3000/users/register',
      method: 'post',
      data: data,
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        console.err(data);
      }
    });
  });
}