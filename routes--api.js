module.exports = (_app) => {
  _app.post('/api/v0/authenticate', require('./controllers/api/ctrlr-authenticate.js'));
  _app.post('/api/v0/users/:user', require('./controllers/api/ctrlr-users.js'));
};
