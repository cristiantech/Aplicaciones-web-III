const express = require('express');
// LLamada als ervivio
const Product = require('./../services/service.product');
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
router.get('/:id',async (req, res,next) => {
  try {
    const {id} = req.params;
    const productsOne = await service.findOne(id);
    res.status(200).json(productsOne);
  } catch (error) {
    next(error);
  }
});

// Metodo Post para agregar datos
router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const updateProduct =await service.update(id, body);
  res.status(201).json(updateProduct);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const deleteProduct = await service.delete(id);
  res.status(201).json(deleteProduct);
});


module.exports = router;