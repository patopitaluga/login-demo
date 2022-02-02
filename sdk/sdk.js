require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
});

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  id: String,
  avatar: String,
  age: Number,
  email: String,
  password: String,
  name: String,
  surname: String,
  role: String,
});
const User = mongoose.model('User', userSchema);

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = User;
