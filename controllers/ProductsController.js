const express = require('express');
const rescue = require('express-rescue');

const productServices = require('../services/ProductServices');
const router = express.Router();

router.post('/', rescue (async (req, res, next) => {
  const product = req.body;
  const addProduct = await productServices.resAddProduct(product);

  const { message, code, erro } = addProduct;
  
  if (erro) return next(erro);

  res.status(code).json(message);
}));

router.use((erro, _req, res, _next) => {
  const { err, code } =erro;
  res.status(code).json({ err });
})
module.exports = router;
