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

const configSearch = function(){
  const form = document.querySelector("#search-form")
  const pageTitle = document.querySelector('.dashboard-current-page')
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(pageTitle.innerHTML == 'Listado de medicos'){
      app.loadListadoMedicos(addDatesRows)
    }else {
      app.loadHistorialTurnos(addDatesRows)
    }
  });
}

const renderAction = function(buttonId, action, date){
  return `<div class="action ${action.containerClass}">
    <i id="${buttonId}${action.icon}" class="icon fas ${action.icon}" data-doctor-id="${date.doctor.id}"
      data-doctor-name="${date.doctor.name}"
      data-doctor-speciality="${date.doctor.speciality}"
      data-date="${date.date}"
      data-time="${date.time}"></i>
  </div>`;
}

const showData = function(e){
  let me = this
  const doctor = document.querySelector("#zm_reg_nombre_doctor"),
        doctorId = document.querySelector("#zm_reg_id_doctor"),
        especialidad = document.querySelector("#zm_reg_especialidad"),
        fecha = document.querySelector("#zm_reg_fecha"),
        hora = document.querySelector("#zm_reg_hora"),
        hdFecha = document.querySelector("#hd_reg_fecha"),
        hdHora = document.querySelector("#hd_reg_hora");

  doctor.value = `Médico: ${me.getAttribute('data-doctor-name')}`;
  doctorId.value = me.getAttribute('data-doctor-id');
  especialidad.value = `Especialidad: ${me.getAttribute('data-doctor-speciality')}`;
  fecha.value = `Fecha: ${me.getAttribute('data-date')}`;
  hora.value = `Hora: ${me.getAttribute('data-time')}`;
  hdFecha.value = me.getAttribute('data-date');
  hdHora.value = me.getAttribute('data-time');
}

const addDatesRows = function(table, dates, actions, filter){
  if(!table || !dates) return;
  filter = filter || (() => true)
  table.innerHTML = ""
  dates.forEach((date, i) => {
    if(filter(date))
      table.innerHTML +=
      '<div class="table-row">' +
        '<div class="table-row-item">' +
          '<img class="avatar-img small" src="img/users/default-user.png" alt="avatar-img">' +
        '</div>' +
        '<div class="table-row-item">' +
          `<p class="table-row-item-text medic-name">${date.doctor.name}</p>` +
        '</div>' +
        '<div class="table-row-item">' +
          `<p class="table-row-item-text medic-speciality">${date.doctor.speciality}</p>` +
        '</div>' +
        '<div class="table-row-item">' +
          `<p class="table-row-item-text date-info">${date.date}</p>` +
        '</div>' +
        '<div class="table-row-item">' +
          `<p class="table-row-item-text time-info">${date.time} hs</p>` +
        '</div>' +
        (actions ?
              '<div class="table-row-item">' +
                '<div class="actions">' +
                  actions.map(a => renderAction(`dateId${i}`, a, date)).join('') +
                '</div>' +
              '</div>'
            :
            "") +
      '</div>';
  });

  if (actions) {
    let openTriggers = []
    dates.forEach((date,i) => {
      actions.forEach(a => {
        let actionId = `#dateId${i}${a.icon}`
        openTriggers.push(actionId)
        let button = document.querySelector(actionId)
        if (button) {          
          button.addEventListener('click', showData)
        }
      });
    })

    app.createPopup({
      popupContainer: '#reserve-popup',
      openTriggers: openTriggers,
      closeTriggers: [
        '#reserve-popup-close'
      ]
    })
  }
}

const patientLinks = [
        {
          link: '#historial-turnos-link',
          default: true,
          onClick: function () {
            app.loadTemplate({
              title: 'Historial de turnos',
              name: 'historial-turnos.html',
              onLoad: () => app.loadHistorialTurnos(addDatesRows)
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
              onLoad: () => app.loadHistorialTurnos(addDatesRows)
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
              onLoad: () => app.loadListadoMedicos(addDatesRows)
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
  configSearch();
  userinfo.innerHTML = window.zenmed.user.dni;
} else if (zenmed.role === 'Doctor') {
  setMenuItems(medicLinks);
  userinfo.innerHTML = window.zenmed.user.registrationNumber;
}