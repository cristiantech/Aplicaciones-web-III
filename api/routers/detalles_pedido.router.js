const express = require('express');
const DetallePedido = require('../services/detalles_pedido.service');
const {createSchema, updateSchema, getSchema} = require('../schema/detalle_pedidos.schema');
const validatorHandler = require('../middleware/validate.handler');


const router = express.Router();
const service = new DetallePedido();

router.get('/', async (req, res, next) => {
    try {
      const allOrderDeatil = await service.find();
      if (allOrderDeatil === 0) {
          res.status(404).json({
            message: "404 not found"
          });
          return;
      }
      res.status(200).json(allOrderDeatil);
    } catch (error) {
      next(error)
    }
});

// Leer un solo producto
router.get('/:detail_order_id', validatorHandler(getSchema, "params" ),
  async (req, res,next) => {
    try {
      const {detail_order_id} = req.params;
      const orderDetailOne = await service.findOne(parseInt(detail_order_id));
      if (orderDetailOne === 0) {
        res.status(404).json({
          message: "404 not found"
        });
        return;
      }
      res.status(200).json(orderDetailOne);
    } catch (error) {
      next(error);
    }
});

// Metodo Post para agregar datos
router.post('/', validatorHandler(createSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newOrderDetail = await service.create(body);
    if (newOrderDetail === 0) {
      res.status(404).json({
        message: "404 not found"
      });
      return;
    }
    res.status(201).json(newOrderDetail);
});

router.patch('/:detail_order_id',
  validatorHandler(getSchema, "params"),
  validatorHandler(updateSchema, "body"),
  async (req, res, next) => {
    try {
      const {detail_order_id} = req.params;
      const body = req.body;
      const updateOrderDetail =await service.update(detail_order_id, body);
      if (updateOrderDetail === 0) {
        res.status(404).json({
          message: "404 not found log"
        });
        return;
      }
      res.status(200).json(updateOrderDetail);
    } catch (error) {
      next(error)
    }
});

router.delete('/:detail_order_id',
  validatorHandler(getSchema,"params"),
  async (req, res) => {
    const {detail_order_id} = req.params;
    const deleteOrderDetail = await service.delete(detail_order_id);
    if (deleteOrderDetail === 0) {
      res.status(404).json({
        message: "404 not found"
      });
      return;
    }
    res.status(201).json(deleteOrderDetail);
});


module.exports = router;