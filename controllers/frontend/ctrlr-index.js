/**
 * This controller will handle the GET request to / by the browser.
 * Will redirect to /login.
 *
 * @param {object} _req - The http request.
 * @param {object} _res - The http response.
 */
module.exports = (_req, _res) => {
  _res.redirect('/login');
};
