const Joi = require('joi');

const loginSchema = {
  body: Joi.object({
    username: Joi.string().min(5).max(30),
    password: Joi.string().min(5).max(50),
    phone: Joi.string().regex(/^\d+$/).min(10).max(10),
    otp: Joi.string().regex(/^\d+$/).min(5).max(5),
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
