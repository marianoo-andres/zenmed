'use strict';

const dd = document.querySelectorAll('.dropdown');

if (dd.length > 0) {
  const toggleDropdown = function (el) {
    el.classList.toggle('open');
  }

  const addDDTriggers = function () {
    dd.forEach( (el) => {
      const triggers = el.getAttribute('data-triggers').split(' ');
      triggers.forEach((el2) => {
        const trigger = document.querySelector(el2);
        trigger.addEventListener('click', () => {
          toggleDropdown(el);
        })
      });
    });
  }

  addDDTriggers();
}

