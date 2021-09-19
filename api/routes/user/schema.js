const Joi = require('joi');

const postSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().regex(/^\d+$/).min(10).max(10).required(),
    otp: Joi.string().min(5).max(5).required(),
    school: Joi.string(),
    class: Joi.string(),
    guardianName: Joi.string(),
    otherTeacher: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    currentLevel: Joi.number(),
    email: Joi.string().email(),
  }),
};

module.exports = {
  postSchema,
};
