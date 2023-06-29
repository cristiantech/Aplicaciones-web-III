const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(10).max(50);
const price = Joi.number().integer().min(10);

const createSchema = Joi.object({
  name: name.required(),
  price: price.required(),
});

const updateSchema = Joi.object({
  name: name,
  price: price,
});

const getSchema = Joi.object({
  id: naid.require(),
});

module.exports = {createSchema, updateSchema, getSchema};

