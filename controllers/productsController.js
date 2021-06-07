const express = require('express');

const router = express.Router();

const { addProduct } = require('../models/productsModels');

const { nameValidation, quantityValidation } = require('../services');

const STATUS_OK = 200;
const CREATED = 201;
const ERROR = 500;

router.get('/', (_req, res) => {
  res.status(STATUS_OK).send('Lista de todos os produtos');
});

router.get('/:id', (_req, res) => {
  res.status(STATUS_OK).send('Produto pelo Id');
});

router.post('/', nameValidation, quantityValidation, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await addProduct(name, quantity);
    res.status(CREATED).json(newProduct.ops[0]);
  } catch (err) {
    res.status(ERROR).json({ message: 'Something is wrong' });
  }
});

router.put('/:id', (_req, res) => {
  res.status(STATUS_OK).send('Update de produto');
});

router.delete('/:id', (_req, res) => {
  res.status(STATUS_OK).send('Deletar produto');
});

module.exports = router;
