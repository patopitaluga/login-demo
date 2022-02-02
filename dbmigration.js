/**
 * This file will empty the User collection and fill it with the two examples
 */
const mongoose = require('mongoose');

const User = require('./sdk/sdk');

const bcrypt = require('bcrypt');

/**
 * Hash the password to be stored.
 *
 * @param {string} _password - The raw password to hash.
 * @return {Promise<string>}
 */
const cryptPassword = (_password) => {
  return new Promise((_resolve, _reject) => {
    bcrypt.genSalt(10, (_errorSalt, _salt) => {
      if (_errorSalt) return _reject(_errorSalt);

      bcrypt.hash(_password, _salt, function(_errorHash, _hash) {
        if (_errorHash) return _reject(_errorHash);
        _resolve(_hash);
      });
    });
  });
};

(async() => { // to be able to use await.
  await User.deleteMany({}); // This is dangerous. This kind of migration wouldn't be recommended for a production project.
  const newUser1 = new User({
    id: 'it-drixit-1',
    avatar: 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png',
    email: 'it@drixit.com',
    password: await cryptPassword('some-password'), // of course the password shouldn't be hardcoded. Might be an environment variable.
    name: 'IT',
    surname: 'Drixit',
    age: 25,
    role: 'admin'
  });
  await newUser1.save();

  const newUser2 = new User({
    id: 'info-drixit-2',
    avatar: 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png',
    email: 'info@drixit.com',
    password: await cryptPassword('other-password'), // of course the password shouldn't be hardcoded. Might be an environment variable.
    name: 'Info',
    surname: 'Drixit',
    age: 30,
    role: 'user'
  });
  await newUser2.save();

  User.find() // view result, should be an array with only users
    .exec((err, _result) => {

      mongoose.connection.close();
      if (_result.length > 0)
        console.log('Success. Demo users created.');
    });
})();
