const constants = require('./app.constants'),
      $ = require('jquery'),
      XM_Popup = require('./vendor/xm-popup');

module.exports = {
  createPopup: function (config) {
    try {
      return new XM_Popup(config);
    } catch(e) {
      if (constants.DEBUG) {
        console.log(e.message);
      }
    }
  },
  loader: {
    show: (loadingText) => {
      const loaderOverlay = document.createElement('div'),
            loaderBox = document.createElement('div'),
            loadingDecoration = document.createElement('div'),
            loaderBoxText = document.createElement('p'),
            loadingBoxDecoText = document.createElement('p');

      loaderOverlay.classList.add('loading-overlay');
      loaderBox.classList.add('loading-box');
      loadingBoxDecoText.classList.add('loading-text-deco');
      loadingDecoration.classList.add('loading-decoration');
      loadingDecoration.append(document.createElement('div'));
      loaderBoxText.classList.add('loading-text');
      loaderBoxText.innerHTML = loadingText;
      loadingBoxDecoText.innerHTML = 'Aguarde unos instantes por favor...';

      loaderBox.append(loadingDecoration);
      loaderBox.append(loaderBoxText);
      loaderBox.append(loadingBoxDecoText);
      loaderOverlay.append(loaderBox);
      document.body.append(loaderOverlay);
    }
  },
  cookies: {
    getCookie: (name) => {
      const regString = `${name}=(\\w*);?`;
      return (new RegExp(regString, 'ig')).exec(document.cookie)[1];
    },
    setCookie: (name, value) => {
      document.cookie = `${name}=${value};`;
    },
    unset: () => {
      document.cookie = 'username=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'password=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  },
  login: function (params) {
    const loginError = document.querySelector('#login-error');

    $.ajax({
      url: 'http://localhost:3000/users/login',
      method: 'post',
      data: params,
      success: function (data) {
        console.log(data);
        if (data.isLogged) {
          if (loginError) loginError.style.display = 'none';
          module.exports.loader.show('Ingresando');

          module.exports.cookies.setCookie('username', params.username);
          module.exports.cookies.setCookie('password', params.password);

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
          if (loginError) loginError.style.display = 'block';
        }
      }
    });
  },
  logout: function () {
    module.exports.loader.show('Cerrando Sesion');

    $.ajax({
      method: 'GET',
      url: 'http://localhost:8099/index.html',
      contentType: 'text/html',
      success: function (page) {
        const tid = window.setTimeout(function () {
          const zmScript = document.createElement("script");
          zmScript.src = 'app.min.js';
          document.title = 'Zenmed';                
          document.body.innerHTML = page;
          document.body.append(zmScript);
        }, 2000);
      }
    });
  }
};