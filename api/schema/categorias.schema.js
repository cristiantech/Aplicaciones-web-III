const Joi = require('joi');

const category_id = Joi.number().integer();
const name = Joi.string().min(8).max(50);
const description = Joi.string().min(1);

const createSchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

const updateSchema = Joi.object({
  name: name,
  description: description,
});

const getSchema = Joi.object({
  category_id: category_id.required()
});

module.exports = {createSchema, updateSchema, getSchema};

