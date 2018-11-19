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
    }else if(pageTitle.innerHTML == 'Listado de proximos turnos'){
      app.loadListadoProximosTurnos(addNextDatesRows)
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
      data-time="${date.time}"
      data-date-id="${date._id}"></i>
  </div>`;
}

const showDataAdd = function(){
  let me = this
  const doctor = document.querySelector("#zm_reg_nombre_doctor"),
        doctorId = document.querySelector("#zm_reg_id_doctor"),
        especialidad = document.querySelector("#zm_reg_especialidad"),
        fecha = document.querySelector("#zm_reg_fecha"),
        hora = document.querySelector("#zm_reg_hora"),
        hdFecha = document.querySelector("#hd_reg_fecha"),
        hdHora = document.querySelector("#hd_reg_hora"),
        reserveButton = document.querySelector('#take-date-button');

  doctor.value = `Médico: ${me.getAttribute('data-doctor-name')}`;
  doctorId.value = me.getAttribute('data-doctor-id');
  especialidad.value = `Especialidad: ${me.getAttribute('data-doctor-speciality')}`;
  fecha.value = `Fecha: ${me.getAttribute('data-date')}`;
  hora.value = `Hora: ${me.getAttribute('data-time')}`;
  hdFecha.value = me.getAttribute('data-date');
  hdHora.value = me.getAttribute('data-time');

  reserveButton.innerHTML = "Confirmar";
  reserveButton.style.backgroundColor = "#44ccc7";
}

const setDeleteData = function(){
  let me = this
  const dateId = document.querySelector("#hd_reg_date_id"),
  deleteDateButton = document.querySelector("#delete-date-button");
  dateId.value = me.getAttribute('data-date-id');

  deleteDateButton.innerHTML = "Confirmar";
  deleteDateButton.style.backgroundColor = "#44ccc7";
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
    let openTriggersAdd = []
    let openTriggersDelete = []
    dates.forEach((date,i) => {
      actions.forEach(a => {
        let actionId = `#dateId${i}${a.icon}`
        let button = document.querySelector(actionId)

        if(a.icon == 'fa-plus'){
          openTriggersAdd.push(actionId)
          if (button) {          
            button.addEventListener('click', showDataAdd)
          }
        }else if(a.icon == 'fa-times'){
          openTriggersDelete.push(actionId)
          if (button) {          
            let dateParts = button.getAttribute('data-date').split('/');
            let hourParts = button.getAttribute('data-time').replace('hs','').split(':');
            if(new Date(dateParts[2], dateParts[1] - 1, dateParts[0], hourParts[0], hourParts[1]) < new Date()){
              button.style.visibility = 'hidden'
            }else {
              button.addEventListener('click', setDeleteData)
            }
          }
        }else if(a.icon == 'fa-marker'){

        }
      });
    })
    
    document.querySelector("#reserve-popup").style.visibility = "visible";
    app.createPopup({
      popupContainer: '#reserve-popup',
      openTriggers: openTriggersAdd,
      closeTriggers: [
        '#reserve-popup-close',
        '#close-take-date-button'
      ]
    })

    document.querySelector("#delete-reserve-popup").style.visibility = "visible";
    app.createPopup({
      popupContainer: '#delete-reserve-popup',
      openTriggers: openTriggersDelete,
      closeTriggers: [
        '#delete-reserve-popup-close',
        '#cancel-delete-button'
      ]
    })
  }
}

const addNextDatesRows = function(table, dates, filter){
  if(!table || !dates) return;
  filter = filter || (() => true);
  table.innerHTML = "";
  dates.forEach((date, i) => {
    if(filter(date))
      table.innerHTML +=
      '<div class="table-row">' +
        '<div class="table-row-item">' +
          '<img class="avatar-img small" src="img/users/default-user.png" alt="avatar-img">' +
        '</div>' +
        '<div class="table-row-item">' +
          `<p class="table-row-item-text medic-name">${date.pacient.name}</p>` +
        '</div>' +
        '<div class="table-row-item">' +
          `<p class="table-row-item-text medic-speciality">${date.pacient.email}</p>` +
        '</div>' +
        '<div class="table-row-item">' +
          `<p class="table-row-item-text medic-speciality">${date.pacient.phoneNumber}</p>` +
        '</div>' +
        '<div class="table-row-item">' +
          `<p class="table-row-item-text date-info">${date.date}</p>` +
        '</div>' +
        '<div class="table-row-item">' +
          `<p class="table-row-item-text time-info">${date.time} hs</p>` +
        '</div>' +
      '</div>';
  });
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
              onLoad: () => app.loadListadoProximosTurnos(addNextDatesRows)
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
              onLoad: () => app.loadListadoProximosTurnos(addNextDatesRows)
            });
          }
        },
      ],
      username = document.querySelector('.user-name'),
      userinfo = document.querySelector('.user-info'),
      searchFilter = document.querySelector('#especiality_name');

username.innerHTML = window.zenmed.user.name;

if (zenmed.role === 'Patient') {
  setMenuItems(patientLinks);
  userinfo.innerHTML = window.zenmed.user.dni;
  searchFilter.placeholder = "Ingrese la especialidad deseada...";
} else if (zenmed.role === 'Doctor') {
  setMenuItems(medicLinks);
  userinfo.innerHTML = window.zenmed.user.registrationNumber;
  searchFilter.placeholder = "Ingrese el nombre del paciente...";
}
configSearch();