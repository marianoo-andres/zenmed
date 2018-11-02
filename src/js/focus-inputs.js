'use strict';

const focusable = document.querySelectorAll('.input-wrap');

focusable.forEach( (el) => {
  const input = el.querySelector('input');
  input.addEventListener('focus', () => {
    el.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    if (input.value === '')
      el.classList.remove('focused');
  });
});