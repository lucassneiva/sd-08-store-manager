const Joi = require('joi');

const insert = Joi.object({
  label1: Joi.string().required(),
  label4: Joi.array().items(Joi.number()).required(),
  label2: Joi.string().isoDate().message('Date needs to be on ISODate pattern')
   .required(),
  label3: Joi.number().required(),
})
.messages({ 'any.required': 'The {#label} field is required.', 'string.type': '{#label} needs to be a string' });

const update = Joi.object({
  label1: Joi.string(),
  label4: Joi.array().items(Joi.number()),
  label2: Joi.string().isoDate().message('Date needs to be on ISODate pattern'),
  label3: Joi.number(),
});

module.exports = {
  insert,
  update,
};
