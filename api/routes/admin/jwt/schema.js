const Joi = require('joi');

const loginSchema = {
  body: Joi.object({
    username: Joi.string().min(5).max(30).required,
    password: Joi.string().min(5).max(50).required,
  })
    .keys()
    .required(),
};

module.exports = {
  loginSchema,
};
