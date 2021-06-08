// const productModel = require('');
const productService = require('../services/productService');
const rescue = require('express-rescue');

//status de respostas HTTP
const HTTP_OK = 200;
const Created = 201;
const InternalServerError = 500;

const getAll = rescue(async (req, res) => {

  const result = await productService.getAll();
  res.status(HTTP_OK).json(result);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const result = await productService.getById(id);

  if (result.error) return next(result);

  res.status(HTTP_OK).json(result);
});


const addProduct = rescue(async (req, res, next) => {

  const { name, quantity } = req.body;
  const result = await productService.addProduct(name, quantity);
  if (result.error) return next(result);
  res.status(Created).json(result);

});

const update = rescue(async (req, res, next) => {
  const {id} = req.params;
  const {name, quantity} = req.body;

  const result = await productService.update(id,name, quantity);
  if (result.error) return next(result);
  res.status(HTTP_OK).json(result);
});


module.exports = {
  getAll,
  getById,
  addProduct,
  update,
};