module.exports = XM_Popup;
/**
 * @file - Popup javascript plugin.
 * @author Scoccimarro Maximiliano
 * @version 1.0.0
 * @copyright Scoccimarro Maximiliano - 2018
 */

/**
 * @constructor
 * @param {object} customConfig  - configuration of the Popup
 */
function XM_Popup(customConfig) {
  const config = {
    popupContainer: '',
    animation: {
      type: 'zoom',
      speed: 400
    },
    openTriggers: [],
    closeTriggers: []
  },
  me = this;

  /**
   * @function init
   * @description - Initialises Popup by setting initial properties and styles
   */
  const init = function () {
    deepExtend(config, customConfig);
    setupPopup();
    createOverlay();
    addTriggers();
  };

  /**
   * @function hideOnEsc
   * @description - Hides popup if Esc keyCode is detected
   */
  const hideOnEsc = function (e) {
    if (e.keyCode === 27) {
      me.hidePopup();
    }
  };

  /**
   * @function setupPopup
   * @description - Initialise popup element and styles
   */
  const setupPopup = function () {
    config.popupElement = document.querySelector(config.popupContainer);
    config.popupElement.style.position = 'absolute';
    config.popupElement.style.top = '120px';
    config.popupElement.style.left = '50%';
    config.popupElement.style.marginLeft = `-${config.popupElement.offsetWidth/2}px`;
    config.popupElement.style.zIndex = 10000;
    config.popupElement.style.opacity = 0;
    config.popupElement.style.visibility = 'hidden';
    config.popupElement.style.transform = 'scale(0)';
    const tid = window.setTimeout( () => {
      config.popupElement.style.transition = `all .${config.animation.speed}s ease-in-out`;
    }, 300);
  };

  /**
   * @function createOverlay
   * @description - Creates overlay to put between popup and background
   */
  const createOverlay = function () {
    config.overlayItem = document.createElement('div');
    config.overlayItem.style.width = '100%';
    config.overlayItem.style.height = `${window.outerHeight}px`;
    config.overlayItem.style.backgroundColor = 'rgba(0, 0, 0, .9)';
    config.overlayItem.style.position = 'absolute';
    config.overlayItem.style.top = 0;
    config.overlayItem.style.left = 0;
    config.overlayItem.style.zIndex = 9999;
    config.overlayItem.style.opacity = 0;
    config.overlayItem.style.visibility = 'hidden';
    config.overlayItem.style.transition = `all .${config.animation.speed/2}s ease-in`;
    document.body.appendChild(config.overlayItem);
  };

  /**
   * @function showOverlay
   * @description - Shows overlay
   */
  const showOverlay = function () {
    config.overlayItem.style.visibility = 'visible';
    config.overlayItem.style.opacity = 1;
  };

  /**
   * @function hideOverlay
   * @description - Hides overlay
   */
  const hideOverlay = function () {
    config.overlayItem.style.visibility = 'hidden';
    config.overlayItem.style.opacity = 0;
  };

  /**
   * @function addTriggers
   * @description - Adds event triggers for the popup to open and close
   */
  const addTriggers = function () {
    config.openTriggers.forEach((el) => {
      const trigger = document.querySelector(el);
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        me.showPopup();
      });
    });

    config.closeTriggers.forEach((el) => {
      const trigger = document.querySelector(el);
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        me.hidePopup();
      });
    });

    config.overlayItem.addEventListener('click', me.hidePopup);
  };

  /**
   * @function showPopup
   * @description - Shows popup
   */
  me.showPopup = function () {
    document.addEventListener('keydown', hideOnEsc);
    showOverlay();
    config.popupElement.style.visibility = 'visible';
    config.popupElement.style.opacity = 1;
    config.popupElement.style.transform = 'scale(1)';
  };

  /**
   * @function hidePopup
   * @description - Hides popup
   */
  me.hidePopup = function () {
    document.removeEventListener('keydown', hideOnEsc);
    hideOverlay();
    config.popupElement.style.visibility = 'hidden';
    config.popupElement.style.opacity = 0;
    config.popupElement.style.transform = 'scale(0)';
  };

  /**
   * @function deepExtend
   * @param {object} a - object to extend with another object's properties
   * @param {object} b - object from which to copy the attributes
   * @description - Extends object a with object b properties, creating a new property in a if it doesn't exist, overwriting existing properties otherwise
   */
  const deepExtend = function (a, b) {
    let c;
    for (const prop in b) {
      if (typeof b[prop] === 'object' && !(b[prop] instanceof Date)) {
        if (b[prop] instanceof Array) {
          c = [];
        } else {
          c = {};
        }
        if (typeof a[prop] === 'undefined') {
          a[prop] = c;
        }

        deepExtend(a[prop], b[prop]);
      } else {
        if (b[prop] instanceof Date) {
          a[prop] = new Date(b[prop].getTime());
        } else {
          a[prop] = b[prop];
        }
      }
    }
  };

  init();
  // console.log(config);
}