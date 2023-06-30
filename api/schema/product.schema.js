const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(10).max(50);
const precie = Joi.number().integer().min(10);

const createSchema = Joi.object({
  name: name.required(),
  precie: precie.required(),
});

const updateSchema = Joi.object({
  name: name,
  precie: precie,
});

const getSchema = Joi.object({
  id: id.required()
});

module.exports = {createSchema, updateSchema, getSchema};

