const Joi = require('joi');

const postSchema = {
  body: Joi.object({
    phone: Joi.string().regex(/^\d+$/).min(10).max(10).required(),
  })
    .keys()
    .required(),
};

module.exports = {
  postSchema,
};
