module.exports = (_app) => {
  _app.get('/', require('./controllers/frontend/ctrlr-index.js'));
  _app.get('/login', require('./controllers/frontend/ctrlr-login.js'));
  _app.get('/user-info', require('./controllers/frontend/ctrlr-user-info.js'));
};
