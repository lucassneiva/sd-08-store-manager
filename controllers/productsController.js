const express = require('express');
const router = express.Router();
const { ObjectID } = require('bson');
const { STATUS_200, STATUS_422, STATUS_500, STATUS_201,
  DEU_ERRO } = require('../statusCode');
const ZERO = 0;

const productsModel = require('../models/productsModel');
const productsServices = require('../services/productsServices');

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsServices.addProduct(name, quantity);
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    console.log(error);
    res.status(STATUS_500).json({ message: DEU_ERRO });
  }
});

router.get('/', async (_req, res) => {
  try {
    const result = await productsServices.getAllProductsServices();
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    console.log(error);
    res.status(STATUS_500).json({ message: DEU_ERRO });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsServices.getByIdProductsServices(id);
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    console.log(error);
    res.status(STATUS_500).json({ message: DEU_ERRO });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const result = await productsServices.updateProductsServices(id, name, quantity);
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    console.log(error);
    res.status(STATUS_500).json({ message: DEU_ERRO });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsServices.deleteProductsServices(id);
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    console.log(error);
    res.status(STATUS_500).json({ message: DEU_ERRO });
  }
});

module.exports = router;
