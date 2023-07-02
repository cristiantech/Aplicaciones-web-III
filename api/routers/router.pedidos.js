const express = require('express');
// LLamada als ervivio
const Pedidos = require('./../services/service.pedidos');
const {createSchema, updateSchema, getSchema} = require('./../schema/schema.pedidos');
const validatorHandler = require('./../middleware/validate.handler');

// generat route para productos
const router = express.Router();
// Genaramos la instancia del servicio
const service = new Pedidos();

// Leer todos los products
router.get('/', async (req, res) => {
    const pedidos = await service.find();
    res.status(200).json(pedidos);
});

// Leer un solo producto
router.get('/:pedidoid', validatorHandler(getSchema, "params" ),
  async (req, res,next) => {
    try {
      const {pedidoid} = req.params;
      const pedidosOne = await service.findOne(parseInt(pedidoid));
      res.status(200).json(pedidosOne);

    } catch (error) {
      next(error);
    }
});

// Metodo Post para agregar datos
router.post('/', validatorHandler(createSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newPedido = await service.create(body);
    res.status(201).json(newPedido);
});

router.patch('/:id',
  validatorHandler(getSchema, "params"),
  validatorHandler(updateSchema, "body"),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const updateProduct =await service.update(id, body);
    res.status(201).json(updateProduct);
    } catch (error) {
      next(error)
    }
});

router.delete('/:id',
  validatorHandler(getSchema,"params"),
  async (req, res) => {
    const {id} = req.params;
    const deleteProduct = await service.delete(id);
    res.status(201).json(deleteProduct);
});


module.exports = router;