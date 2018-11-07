const app = require('./app.core');

app.createPopup({
  popupContainer: '#register-popup',
  openTriggers: [
    '#register-popup-open1',
    '#register-popup-open2'
  ],
  closeTriggers: [
    '#register-popup-close'
  ]
});