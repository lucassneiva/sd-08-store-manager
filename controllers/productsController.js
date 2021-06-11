const express = require('express');
const router = express.Router();

const productsServices = require('../services/productsServices');
const ERROR_CODE = 422;
const STATUS_OK = 200;

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const body = await productsServices.insert(name, quantity);

  if(body.err) return res.status(body.status).json(body);

  return res.status(body.status).json(body.data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.findById(id);

  if(!product) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Wrong id format' } });

  return res.status(product.status).json(product.data);
});

router.get('/', async (_req, res) => {
  const data = await productsServices.getAll();

  if(!data) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Something went wrong' } });

  return res.status(STATUS_OK).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productsServices.findById(id);

  const correctName = name? name : product.data.name;
  const correctQuantity = quantity !== undefined ? quantity : product.data.quantity;

  const data = await productsServices.updateByID(id, correctName, correctQuantity);

  if(data.err) return res.status(data.status).json(data);

  if (!data) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Wrong id format' } });


  return res.status(data.status).json(data.message);
});

router.delete('/id', async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.findById(id);
  const data = await productsServices.deleteByID(id);

  if(!data) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Wrong id format' } });

  return res.status(data.status).json(product.data);
});

module.exports = router;
