const Joi = require('joi');

const loginSchema = {
  body: Joi.object({
    phone: Joi.string().regex(/^\d+$/).min(10).max(10).required(),
    otp: Joi.string().regex(/^\d+$/).min(5).max(5).required(),
  })
    .keys()
    .required(),
};

module.exports = {
  loginSchema,
};
