const Joi = require('joi');

const user_id = Joi.number().min(1);
const firstname = Joi.string().max(150);
const lastname = Joi.string().min(5).max(150);
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(150);


const createUserSchema = Joi.object({
  firstname: firstname.required(),
  lastname: lastname.required(),
  email: email.required(),
  password: password.required(),
  });

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  firstname: firstname,
  lastname: lastname,
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  user_id: user_id.required()
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema, loginUserSchema};

