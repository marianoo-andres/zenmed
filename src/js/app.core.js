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
    },
    hide: () => {
      document.body.removeChild(document.querySelector('.loading-overlay'));
    }
  },
  cookies: {
    getCookie: (name) => {
      const regString = `${name}=(\\w*);?`,
            cookie = (new RegExp(regString, 'ig')).exec(document.cookie);
      if (cookie) return cookie[1];
    },
    setCookie: (name, value) => {
      document.cookie = `${name}=${value};`;
    },
    unset: () => {
      document.cookie = 'username=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'password=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  },
  loadPage: function (config) {
    $.ajax({
      method: 'GET',
      url: `http://localhost:8099/templates/${config.template}`,
      contentType: 'text/html',
      success: function (page) {
        const zmScript = document.createElement("script");
        zmScript.src = 'dashboard.min.js';
        document.title = 'Zenmed | Dashboard'; 

        if (config.timeout) {
          const tid = window.setTimeout(function () {             
            document.body.innerHTML = page;
            document.body.append(zmScript);
          }, config.timeout);
        } else {
          document.body.innerHTML = page;
          document.body.append(zmScript);
        }              
      }
    });
  },
  loadTemplate: function (config) {
    $.ajax({
      method: 'GET',
      url: `http://localhost:8099/templates/${config.name}`,
      contentType: 'text/html',
      success: function (page) {
        const dashBody = document.querySelector('.dashboard-body');
        dashBody.innerHTML = page;
        const pageTitle = document.querySelector('.dashboard-current-page');

        pageTitle.innerHTML = config.title;
        config.onLoad();
      }
    });
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
          module.exports.cookies.setCookie('user-id', data.user._id);

          window.zenmed = data;
          module.exports.loadPage({template: 'dashboard.html', timeout: 2000});

        } else {
          if (loginError) loginError.style.display = 'block';
        }
      }
    });
  },
  reload: function (params) {
    document.querySelector('.login-page').style.display = 'none';

    $.ajax({
      url: 'http://localhost:3000/users/login',
      method: 'post',
      data: params,
      success: function (data) {
        window.zenmed = data;
        module.exports.loadPage({template: 'dashboard.html'});
      }
    });
  },
  logout: function () {
    module.exports.cookies.unset();
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
  },
  loadHistorialTurnos: function (renderList) {
    const historialTurnos = document.querySelector('#historialTurnos');
    const patientId = module.exports.cookies.getCookie('user-id');
    const especialidad = document.querySelector('#especiality_name');
    $.ajax({
      url: `http://localhost:3000/reservedDates/patients/${patientId}`,
      method: 'get',
      success: function (dates) {
        renderList(historialTurnos, dates, 
          [//{ containerClass: 'reprogram', icon: 'fa-marker' },
           { containerClass: 'cancel', icon: 'fa-times' }],
           (date) => RegExp(`.*${especialidad.value.toUpperCase()}.*`).test(date.doctor.speciality.toUpperCase()))         
      },
      error: function(err){
        console.log(err);
      }
    });
  },
  loadListadoMedicos: function (renderList) {
    const listadoMedicos = document.querySelector('#listadoMedicos')
    const especialidad = document.querySelector('#especiality_name')

    $.ajax({
      url: 'http://localhost:3000/availableDates/5',
      method: 'get',
      success: function (dates) {
        renderList(listadoMedicos, dates, 
          [{ containerClass: 'reserve', icon: 'fa-plus' }],
          (date) => RegExp(`.*${especialidad.value.toUpperCase()}.*`).test(date.doctor.speciality.toUpperCase()))        
      },
      error: function(err){
        console.log(err);
      }
    });
  },
  loadListadoProximosTurnos: function (renderList) {
    const listadoMedicos = document.querySelector('#listadoProximosTurnos')
    const paciente = document.querySelector('#especiality_name')
    
    $.ajax({
      url: `http://localhost:3000/reservedDates/doctors/${module.exports.cookies.getCookie('user-id')}`,
      method: 'get',
      success: function (dates) {
        renderList(listadoMedicos, dates,
          (date) => {
            let dateParts = date.date.split('/');
            let hourParts = date.time.replace('hs','').split(':');
            return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], hourParts[0], hourParts[1]) > new Date()
              && RegExp(`.*${paciente.value.toUpperCase()}.*`).test(date.pacient.name.toUpperCase())
          });
      },
      error: function(err){
        console.log(err);
      }
    });
  },
  loadAdministrarDoctores: function () {
    const wrap = document.querySelector('#administrar-doctores-wrap');

    module.exports.createPopup({
      popupContainer: '#create-doctor-popup',
      openTriggers: [
        '#create-doctor-popup-open'
      ],
      closeTriggers: [
        '#create-doctor-popup-close'
      ]
    });
    
    $.ajax({
      url: 'http://localhost:3000/doctors',
      method: 'GET',
      success: function (data) {
        data.forEach( (el) => {
          wrap.innerHTML += `
          <!-- TABLE ROW -->
          <div class="table-row">
            <!-- TABLE ROW ITEM -->
            <div class="table-row-item">
              <!-- AVATAR IMG -->
              <img class="avatar-img small" src="img/users/default-user.png" alt="avatar-img">
              <!-- /AVATAR IMG -->
            </div>
            <!-- /TABLE ROW ITEM -->

            <!-- TABLE ROW ITEM -->
            <div class="table-row-item">
              <p class="table-row-item-text pacient-name">${el.name}</p>
            </div>
            <!-- /TABLE ROW ITEM -->

            <!-- TABLE ROW ITEM -->
            <div class="table-row-item">
              <p class="table-row-item-text pacient-email">${el.registrationNumber}</p>
            </div>
            <!-- /TABLE ROW ITEM -->

            <!-- TABLE ROW ITEM -->
            <div class="table-row-item">
              <p class="table-row-item-text pacient-phone">${el.specialities}</p>
            </div>
            <!-- /TABLE ROW ITEM -->

            <!-- TABLE ROW ITEM -->
            <div class="table-row-item">
              <p class="table-row-item-text date-info">${el.startTime}hs - ${el.endTime}hs</p>
            </div>
            <!-- /TABLE ROW ITEM -->

            <!-- TABLE ROW ITEM -->
            <div class="table-row-item">
              <p class="table-row-item-text date-info">${el.duration} min</p>
            </div>
            <!-- /TABLE ROW ITEM -->
          </div>
          <!-- /TABLE ROW -->`;
        });
      }
    })
  }
};