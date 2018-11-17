'use strict';

const app = require('./app.core'),
      data = {
        username: app.cookies.getCookie('username'),
        password: app.cookies.getCookie('password')
      };

if (typeof data.username !== 'undefined' && typeof data.password !== 'undefined') {
  app.reload(data);
}