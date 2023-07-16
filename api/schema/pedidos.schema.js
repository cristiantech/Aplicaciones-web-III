const Joi = require('joi');

const order_id = Joi.number().integer().min(1);
const state = Joi.string().min(1);
const user_id = Joi.number().integer().min(1);


const createSchema = Joi.object({
  state: state.required(),
  user_id: user_id.required()
});

const updateSchema = Joi.object({
  order_id: order_id,
  state: state,
  user_id: user_id
});

const getSchema = Joi.object({
  order_id: order_id.required()
});

module.exports = {createSchema, updateSchema, getSchema};

