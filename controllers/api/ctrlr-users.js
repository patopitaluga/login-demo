const jwt = require('jsonwebtoken');

const User = require('../../sdk/sdk');

/**
 * This controller will handle the POST request to /api/v0/users/:user
 *
 * @param {object} _req
 * @param {object} _res
 */
module.exports = (_req, _res) => {
  if (!_req.body.token) return _res.status(401).send({
    status: 'Unauthorized',
  });
  // this might be set as an Express middleware if it is necesary in many endpoints.
  jwt.verify(_req.body.token, process.env.SECRET, (_err, _decoded) => {

    User.find({ id: _decoded.id, })
      .limit(1).exec(async(_err, _foundUsers) => {
        if (_foundUsers.length === 0) // if the id doesn't match with an existing user.
          return _res.status(401).send({
            status: 'Unauthorized',
          });

        const token = jwt.sign({ id: _foundUsers[0].id, }, process.env.SECRET);

        _res.send({
          id: _foundUsers[0].id,
          avatar: _foundUsers[0].avatar,
          email: _foundUsers[0].email,
          name: _foundUsers[0].name,
          surname: _foundUsers[0].surname,
          age: _foundUsers[0].age,
          role: _foundUsers[0].role,
        });
      });
  });
};
