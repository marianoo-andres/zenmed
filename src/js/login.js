'use strict';

const $ = require('jquery'),
      app = require('./app.core'),
      loginForm = document.querySelector('#login-form'),
      username = document.querySelector('#zm_user'),
      password = document.querySelector('#zm_pwd');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      username: username.value,
      password: password.value
    };

    app.login(data);
  });
}