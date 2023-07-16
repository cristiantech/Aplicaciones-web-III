const express = require('express');
// LLamada als ervivio
const Usuarios = require('../services/usuarios.service');
const {createUserSchema, updateUserSchema, getUserSchema, loginUserSchema} = require('../schema/usuarios.schema');
const validatorHandler = require('../middleware/validate.handler');


const router = express.Router();
const service = new Usuarios();

router.get('/', async (req, res) => {
    const userAll = await service.find();
    res.status(200).json(userAll);
});

router.get('/:user_id',
       validatorHandler(getUserSchema, "params" ),
        async (req, res, next) => {
          try {
            const {user_id} = req.params;
            const userOne = await service.findOne(parseInt(user_id));
            res.status(200).json(userOne);
          } catch (error) {
            next(error);
          }
});
//Login
router.post('/',
       validatorHandler(loginUserSchema, "body"),
        async (req, res) => {
          const {email, password} = req.body;
          const loginUser = await service.login(email, password);
          console.log(loginUser)
          if (loginUser.length > 0) {
            res.status(200).json(loginUser);
          } else {
            res.status(404).json({
              message: "404 not found"
            });
          }
});
// Crear Usuarios
router.post('/created', validatorHandler(createUserSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    console.log(newUser.length)
    if (newUser.length === 0) {
        res.status(404).json({
        message: "404 not found"
      });
      return;
    }
    res.status(201).json(newUser);
});

router.patch('/:user_id',
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const {user_id} = req.params;
      const body = req.body;
      const updateUser = await service.update(user_id, body);
      if (updateUser.length === 0) {
        res.status(404).json({
          message: "404 not found"
        });
        return;
      }
      res.status(200).json(updateUser);
    } catch (error) {
      next(error)
    }
});

router.delete('/:user_id',
  validatorHandler(getUserSchema,"params"),
  async (req, res) => {
      const {user_id} = req.params;
      const deleteUser = await service.delete(user_id);
      if (deleteUser.length === 0) {
        res.status(404).json({
          message: "404 not found"
        });
        return;
      }
      res.status(200).json(deleteUser);

});


module.exports = router;