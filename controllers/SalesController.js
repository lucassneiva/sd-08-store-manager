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

router.use((erro, _req, res, _next) => {
  const { err, code } = erro;

  res.status(code).json({ err });
});

module.exports = router;