const Joi = require('joi');

const product_id = Joi.number().integer();
const name = Joi.string().min(10).max(50);
const description = Joi.string().min(1);
const precie = Joi.number().precision(2).positive();

const createSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  precie: precie.required(),
});

const updateSchema = Joi.object({
  name: name,
  description: description,
  precie: precie,
});

const getSchema = Joi.object({
  product_id: product_id.required()
});

module.exports = {createSchema, updateSchema, getSchema};

