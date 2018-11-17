'use strict';

const app = require('./app.core'),
      constants = require('./app.constants'),
      data = {
        username: app.cookies.getCookie('username'),
        password: app.cookies.getCookie('password')
      };

