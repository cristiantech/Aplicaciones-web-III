const Joi = require('joi');

const pedidoid = Joi.number().integer().min(1);
const fecha = Joi.date();
const estado = Joi.string().min(1).max(50);
const userid = Joi.number().integer().min(1);

const createSchema = Joi.object({
  fecha: fecha.required(),
  estado: estado.required(),
  userid: userid.required()
});

const updateSchema = Joi.object({
  fecha: fecha,
  estado: estado,
  userid: userid
});

const getSchema = Joi.object({
  pedidoid: pedidoid.required()
});

module.exports = {createSchema, updateSchema, getSchema};

