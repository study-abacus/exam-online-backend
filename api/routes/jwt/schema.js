const Joi = require('joi');

const loginSchema = {
  body: Joi.object({
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(50).required(),
    phone: Joi.string().regex(/^\d+$/).min(10).max(10).required(),
    otp: Joi.string().regex(/^\d+$/).min(5).max(5).required(),
  })
    .with('username', 'password')
    .with('phone', 'otp')
    .xor('username', 'phone')
    .keys()
    .required(),
};

module.exports = {
  loginSchema,
};
