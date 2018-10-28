(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./js/feature1');

},{"./js/feature1":2}],2:[function(require,module,exports){
'use strict';

var t1 = document.querySelector('.title1');
t1.style.transition = 'color .4s ease-in';
t1.style.textAlign = 'center';
t1.style.marginTop = '40px';

var getRandomRGB = function getRandomRGB() {
  return Math.round(Math.random() * Math.pow(16, 6)).toString(16);
  ;
};

var iid = window.setInterval(function () {
  t1.style.color = '#' + getRandomRGB();
}, 500);

},{}]},{},[1]);
