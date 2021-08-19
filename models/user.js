const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const validator = require('validator');
const Joi = require('joi');
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
});

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id, username: this.username },
    'jwtSecret'
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(data);
};
module.exports.User = User;
module.exports.registerValidation = registerValidation;
