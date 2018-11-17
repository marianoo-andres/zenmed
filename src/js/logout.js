const app = require('./app.core'),
      logoutButton = document.querySelector('#logout-button');

if (logoutButton) {
  logoutButton.addEventListener('click', function (e) {
    e.preventDefault();
    app.logout();
  });
}
