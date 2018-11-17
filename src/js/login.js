'use strict';

const $ = require('jquery'),
      loginForm = document.querySelector('#login-form'),
      username = document.querySelector('#zm_user'),
      password = document.querySelector('#zm_pwd'),
      loginError = document.querySelector('#login-error');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      username: username.value,
      password: password.value
    };

    $.ajax({
      url: 'http://localhost:3000/users/login',
      method: 'post',
      data: data,
      success: function (data) {
        console.log(data);
        if (data.isLogged) {
          loginError.style.display = 'none';
          document.body.innerHTML = 'Loading...';

          $.ajax({
            method: 'GET',
            url: 'http://localhost:8099/templates/dashboard.html',
            contentType: 'text/html',
            success: function (page) {
              const tid = window.setTimeout(function () {
                const zmScript = document.createElement("script");
                zmScript.src = 'app.min.js';
                document.title = 'Zenmed | Dashboard';                
                document.body.innerHTML = page;
                document.body.append(zmScript);

                const username = document.querySelector('.user-name'),
                      userinfo = document.querySelector('.user-info');
                username.innerHTML = data.user.name;
                userinfo.innerHTML = data.user.dni;

              }, 2000);
            }
          });

        } else {
          loginError.style.display = 'block';
        }
      }
    })
  });
}