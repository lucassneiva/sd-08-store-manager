const express = require('express');
const rescue = require('express-rescue');

const salesServices = require('../services/SalesServices');
const router = express.Router();

router.post('/', rescue (async (req, res, next) => {
  const sold = req.body;
  
  const addProduct = await salesServices.addSold(sold);
  
  const { message, code, erro } = addProduct;
  
  if (erro) return next(erro);

  res.status(code).json(message);
}));

router.get('/', rescue (async (_req, res, next) => {
  const getAll = await salesServices.getAllSales();

  const { message, code, erro } = getAll;
  
  if (erro) return next(erro);

  res.status(code).json(message);
}));

router.get('/:id', rescue (async (req, res, next) => {
  const { id } = req.params;
  const getById = await salesServices.getSaleById(id);

  const { message, code, erro } = getById;
  
  if (erro) return next(erro);

  res.status(code).json(message);
}));

router.put('/:id', rescue( async (req, res, next) => {
  const { id } = req.params;
  const sale = req.body;
  
  const updateSale = await salesServices.updateSales(id, sale);

  const { message, code, erro } = updateSale;
  
  if (erro) return next(erro);

  res.status(code).json(message);
}));

router.use((erro, _req, res, _next) => {
  const { err, code } = erro;

  res.status(code).json({ err });
});

module.exports = router;