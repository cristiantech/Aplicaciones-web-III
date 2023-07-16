const express = require('express');
// LLamada als ervivio
const Product = require('../services/productos.service');
const {createSchema, updateSchema, getSchema} = require('../schema/productos.schema');
const validatorHandler = require('../middleware/validate.handler');


const router = express.Router();
const service = new Product();


router.get('/', async (req, res, next) => {
    try {
      const allProducts = await service.find();
      res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
});

router.get('/:product_id',
       validatorHandler(getSchema, "params" ),
       async (req, res,next) => {
          try {
            const {product_id} = req.params;
            const productOne = await service.findOne(product_id);
            if (productOne === 0) {
              res.status(404).json({
                message: "404 not found"
              });
              return;
            }
            res.status(200).json(productOne);
          } catch (error) {
            next(error);
          }
});

router.post('/',
  validatorHandler(createSchema, "body"),
    async (req, res, next) => {
      try {
          const body = req.body;
          const newProduct = await service.create(body);
          if (newProduct === 0) {
            res.status(404).json({
              message: "404 not found"
            });
            return;
          }
          res.status(201).json(newProduct);
        } catch (error) {
          next(error);
      }
});

router.patch('/:product_id',
  validatorHandler(getSchema, "params"),
  validatorHandler(updateSchema, "body"),
  async (req, res, next) => {
    try {
      const {product_id} = req.params;
      const body = req.body;
      const updateProduct = await service.update(product_id, body);
      if (updateProduct === 0) {
        res.status(404).json({
          message: "404 not found"
        });
        return;
      }
      res.status(200).json(updateProduct);
    } catch (error) {
      next(error);
    }
});

router.delete('/:product_id',
  validatorHandler(getSchema,"params"),
  async (req, res, next) => {
    try {
      const {product_id} = req.params;
      const deleteProduct = await service.delete(product_id);
      if (deleteProduct === 0) {
        res.status(404).json({
          message: "404 not found"
        });
        return;
      }
      res.status(200).json(deleteProduct);
    } catch (error) {
      next(error);
    }

});


module.exports = router;