const express = require('express');
// LLamada als ervivio
const Product = require('./../services/service.product');
const {createSchema, updateSchema, getSchema} = require('./../schema/product.schema');
const validatorHandler = require('./../middleware/validate.handler');

// generat route para productos
const router = express.Router();
// Genaramos la instancia del servicio
const service = new Product();

// Leer todos los products
router.get('/', async (req, res) => {
    const products = await service.find();
    res.status(200).json(products);
});

// Leer un solo producto
router.get('/:id', validatorHandler(getSchema, "params" ),
  async (req, res,next) => {
    try {
      const {id} = req.params;
      const productsOne = await service.findOne(id);
      res.status(200).json(productsOne);
    } catch (error) {
      next(error);
    }
});

// Metodo Post para agregar datos
router.post('/', validatorHandler(createSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
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