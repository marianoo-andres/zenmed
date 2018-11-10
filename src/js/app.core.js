const constants = require('./app.constants'),
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
  }
};