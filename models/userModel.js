const mongoose = require('mongoose');
const validator = require('validator');
const bcrpt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  photo: String,
  password: {
    type: String,
    rquired: [true, 'Please enter a Password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: 'Passwords are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Check if the password is being modified or created the first time
  if (!this.isModified('password')) return next();

  //Encrypt the password
  this.password = await bcrpt.hash(this.password, 12);

  // delete the confirmation password
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;
