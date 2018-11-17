'use strict';

const app = require('./app.core');

const activateMenuItem = function (links, el) {
  links.forEach( (e) => {
    const ele = document.querySelector(e.link);
    ele.classList.remove('selected');
  });

  el.classList.add('selected');
};

const setMenuItems = function (links) {
  links.forEach( (e) => {
    const el = document.querySelector(e.link);
    el.style.display = 'block';
    el.addEventListener('click', function () {
      e.onClick();
      activateMenuItem(links, this);
    });

    if (e.default) {
      el.classList.add('selected');
      e.onClick();
    }
  });
};

const patientLinks = [
        {
          link: '#historial-turnos-link',
          default: true,
          onClick: function () {
            app.loadTemplate({
              title: 'Historial de turnos',
              name: 'historial-turnos.html',
              onLoad: app.loadHistorialTurnos
            });
          }
        },
        {
          link: '#historial-turnos-link-mobile',
          default: false,
          onClick: function () {
            app.loadTemplate({
              title: 'Historial de turnos',
              name: 'historial-turnos.html',
              onLoad: app.loadHistorialTurnos
            });
          }
        },
        {
          link: '#listado-medicos-link',
          default: false,
          onClick: function () {
            app.loadTemplate({
              title: 'Listado de medicos',
              name: 'listado-medicos.html',
              onLoad: app.loadListadoMedicos
            });
          }
        },
        {
          link: '#listado-medicos-link-mobile',
          default: false,
          onClick: function () {
            app.loadTemplate({
              title: 'Listado de medicos',
              name: 'listado-medicos.html',
              onLoad: app.loadListadoMedicos
            });
          }
        }
      ],
      medicLinks = [
        {
          link: '#listado-turnos-link',
          default: true,
          onClick: function () {
            app.loadTemplate({
              title: 'Listado de proximos turnos',
              name: 'listado-proximos-turnos.html',
              onLoad: app.loadListadoProximosTurnos
            });
          }
        },
        {
          link: '#listado-turnos-link-mobile',
          default: false,
          onClick: function () {
            app.loadTemplate({
              title: 'Listado de proximos turnos',
              name: 'listado-proximos-turnos.html',
              onLoad: app.loadListadoProximosTurnos
            });
          }
        },
      ],
      username = document.querySelector('.user-name'),
      userinfo = document.querySelector('.user-info');

username.innerHTML = window.zenmed.user.name;

if (zenmed.role === 'Patient') {
  setMenuItems(patientLinks);
  userinfo.innerHTML = window.zenmed.user.dni;
} else if (zenmed.role === 'Doctor') {
  setMenuItems(medicLinks);
  userinfo.innerHTML = window.zenmed.user.registrationNumber;
}