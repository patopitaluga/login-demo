const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../sdk/sdk');

/**
 * Utility to compare password hashes. Should be usable in other parts of the project. I'm keeping it here for convenience.
 *
 * @param {string} _plainPass
 * @param {string} _hashedPasswordToCompare
 * @return {Promise<boolean>}
 */
const comparePassword = (_plainPass, _hashedPasswordToCompare) => {
  return new Promise((_resolve, _reject) => {
    bcrypt.compare(_plainPass, _hashedPasswordToCompare, function(_err, _isPasswordMatch) {
      if (_err) return _reject(_err);

      return _resolve(_isPasswordMatch);
    });
  });
};

/**
 * This controller will handle the POST request to /api/v0/authenticate by the browser.
 *
 * @param {object} _req - The http request.
 * @param {object} _res - The http response.
 */
module.exports = (_req, _res) => {
  if (!_req.body.email || !_req.body.password)
    return _res.status(400).send({
      status: 'Email and password body params are required',
    });

  User.find(
    {
      email: _req.body.email,
    }
  )
    .limit(1).exec(async(_err, _foundUsers) => {
      if (_foundUsers.length === 0) // if the email does not belong to a user
        return _res.status(400).send({
          status: 'Wrong login1',
        });

      // if the email belongs to a user but the password is wrong
      if (!await comparePassword(_req.body.password, _foundUsers[0].password))
        return _res.status(400).send({
          status: 'Wrong login2',
        });

      const token = jwt.sign({ id: _foundUsers[0].id, }, process.env.SECRET);

      _res.send({
        jwt: token,
      });
    });
};
