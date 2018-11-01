'use strict';

const fitTargets = document.querySelectorAll('.fit-to-screen');

fitTargets.forEach((el) => {
  el.style.minHeight = `${window.outerHeight}px`;
});
