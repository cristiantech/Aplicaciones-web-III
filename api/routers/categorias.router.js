const express = require('express');
// LLamada als ervivio
const Categorias = require('../services/categorias.service');
const {createSchema, updateSchema, getSchema} = require('../schema/categorias.schema');
const validatorHandler = require('../middleware/validate.handler');

const router = express.Router();
const service = new Categorias();

router.get('/', async (req, res) => {
    const allCategory = await service.find();
    res.status(200).json(allCategory);
});

router.get('/:category_id', validatorHandler(getSchema, "params" ),
  async (req, res,next) => {
    try {
      const {category_id} = req.params;
      const categoryOne = await service.findOne(parseInt(category_id));
      if (categoryOne === 0) {
        res.status(404).json({
          message: "404 not found"
        });
        return;
      }
      res.status(200).json(categoryOne);
    } catch (error) {
      next(error);
    }
});

router.post('/', validatorHandler(createSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      if(newCategory === 0) {
        res.status(404).json({
          message: "404 not found"
        });
        return;
      }
      res.status(200).json(newCategory);
    } catch (error) {
      next(error);
    }

});

router.patch('/:category_id',
  validatorHandler(getSchema, "params"),
  validatorHandler(updateSchema, "body"),
  async (req, res, next) => {
    try {
      const {category_id} = req.params;
      const body = req.body;
      const updateCategory = await service.update(category_id, body);
      if(updateCategory === 0) {
        res.status(404).json({
          message: "404 not found"
        });
        return;
      }
      res.status(201).json(updateCategory);
    } catch (error) {
      next(error)
    }
});

router.delete('/:category_id',
  validatorHandler(getSchema,"params"),
  async (req, res, next) => {
    try {
      const {category_id} = req.params;
      const deleteCategory = await service.delete(category_id);
      if(deleteCategory === 0) {
        res.status(404).json({
          message: "404 not found"
        });
        return;
      }
      res.status(201).json(deleteCategory);
    } catch (error) {
      next(error)
    }

});


module.exports = router;