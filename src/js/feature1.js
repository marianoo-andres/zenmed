'use strict';

const t1 = document.querySelector('.title1');
t1.style.transition = 'color .4s ease-in';
t1.style.textAlign = 'center';
t1.style.marginTop = '40px';

const getRandomRGB = () => {
  return Math.round(Math.random() * Math.pow(16, 6)).toString(16);
;}

const iid = window.setInterval(() => {
  t1.style.color = `#${getRandomRGB()}`;
}, 500);

