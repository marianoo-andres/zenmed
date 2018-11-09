const $ = require('jquery');

$('.mobile-menu-trigger').on('click', function () {
  $('.mobile-menu').slideToggle(600);
});