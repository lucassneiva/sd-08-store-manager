const express = require('express');
const router = express.Router();
const salesServices = require('../services/salesServices');
const ERROR_CODE = 422;
const STATUS_OK = 200;

router.post('/', async (req, res) => {
  const itensSold = req.body;
  if (!itensSold) return res
    .status(ERROR_CODE)
    .json({ message: 'No itens sold? Put them into body'});

  const body = await salesServices.insert(itensSold);

  if(body && body.err) return res.status(body.status).json(body);

  return res.status(body.status).json(body.data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const body = await salesServices.findById(id);

  if(!body) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Wrong id format' } });

  return res.status(body.status).json(body.data);
});

router.get('/', async (_req, res) => {
  const body = await salesServices.getAll();

  if(!body) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Something went wrong' } });

  return res.status(STATUS_OK).json(body);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  const product = await salesServices.findById(id);

  const correctProductId = productId? productId : product.data.productId;
  const correctQuantity = quantity !== undefined ? quantity : product.data.quantity;

  const body = await salesServices.updateByID(id, correctProductId, correctQuantity);

  if(body.err) return res.status(body.status).json(body);

  if (!body) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Wrong id format' } });


  return res.status(body.status).json(body.message);
});

router.delete('/id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.findById(id);
  const body = await salesServices.deleteByID(id);

  if(!body) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Wrong id format' } });

  return res.status(body.status).json(sale.body);
});

module.exports = router;
