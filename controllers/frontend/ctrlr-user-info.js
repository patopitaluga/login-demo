const path = require('path'); // to deliver the html file content.

/**
 * This controller will handle the GET request to /user-info by the browser.
 * Will display the user-info page.
 *
 * @param {object} _req - The http request.
 * @param {object} _res - The http response.
 */
module.exports = (_req, _res) => {
  _res.sendFile(path.resolve(__dirname, '../../views/user-info.html')); // without template engine.
};
