// const productModel = require('');
const productService = require('../services/productService');
const rescue = require('express-rescue');

//status de respostas HTTP
const Created = 201;
const InternalServerError = 500;

const getAll = async (req, res) => {
  try {
    const result = await productService.getAll();
    res.status(Created).json(result);
  } catch (error) {
    res.status(InternalServerError).json({
      message: err.message
    });
  }
};

const addProduct = rescue(async (req, res, next) => {

  const { name, quantity } = req.body;
  const result = await productService.addProduct(name, quantity);
  if (result.error) return next(result);
  res.status(Created).json(result);

});

module.exports = {
  getAll,
  addProduct,
};