const express = require('express');
// LLamada als ervivio
const Pedidos = require('../services/pedidos.service');
const {createSchema, updateSchema, getSchema} = require('../schema/pedidos.schema');
const validatorHandler = require('../middleware/validate.handler');


const router = express.Router();
const service = new Pedidos();

router.get('/', async (req, res, next) => {
    try {
      const allOrders = await service.find();
      res.status(200).json(allOrders);
      } catch (error) {
      next(error)
    }

});

router.get('/:order_id',
      validatorHandler(getSchema, "params" ),
        async (req, res, next) => {
          try {
            const {order_id} = req.params;
            const orderOne = await service.findOne(parseInt(order_id));
            if (orderOne === 0) {
              res.status(404).json({
                message: "404 not found"
              });
              return;
            }
            res.status(200).json(orderOne);
          } catch (error) {
            next(error);
          }
});

router.post('/',
       validatorHandler(createSchema, "body"),
       async (req, res, next) => {
        try {
          const body = req.body;
          const newOrder = await service.create(body);
          if(newOrder === 0) {
            res.status(404).json({
              message: "404 not found"
            });
            return;
          }
          res.status(201).json(newOrder);
        } catch (error) {
          next(error)
        }

});

router.patch('/:order_id',
  validatorHandler(getSchema, "params"),
  validatorHandler(updateSchema, "body"),
  async (req, res, next) => {
    try {
      const {order_id} = req.params;
      const body = req.body;
      const updateOrder =await service.update(order_id, body);
      if(updateOrder === 0) {
        res.status(404).json({
          message: "404 not found"
        });
        return;
      }
      res.status(200).json(updateOrder);
    } catch (error) {
      next(error)
    }
});

router.delete('/:order_id',
  validatorHandler(getSchema,"params"),
  async (req, res) => {
    const {order_id} = req.params;
    const deleteOrder = await service.delete(order_id);
    if(deleteOrder === 0) {
      res.status(404).json({
        message: "404 not found"
      });
      return;
    }
    res.status(200).json(deleteOrder);
});


module.exports = router;