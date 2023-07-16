const Joi = require('joi');

const detail_order_id = Joi.number().integer().min(1);
const order_id = Joi.number().integer().min(1);
const product_id = Joi.number().integer().min(1);
const quantity = Joi.number().integer().min(1);
const observation = Joi.string().min(1);

const createSchema = Joi.object({
  order_id: order_id.required(),
  product_id: product_id.required(),
  quantity: quantity.required(),
  observation: observation.required(),
});

const updateSchema = Joi.object({
  order_id: order_id,
  product_id: product_id,
  quantity: quantity,
  observation: observation
});

const getSchema = Joi.object({
  detail_order_id: detail_order_id.required()
});

module.exports = {createSchema, updateSchema, getSchema};

