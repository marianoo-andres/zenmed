const XM_Popup = require('./vendor/xm-popup');

new XM_Popup({
  popupContainer: '#register-popup',
  openTriggers: [
    '#register-popup-open1',
    '#register-popup-open2'
  ],
  closeTriggers: [
    '#register-popup-close'
  ]
});