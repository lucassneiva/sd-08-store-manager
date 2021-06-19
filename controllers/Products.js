const rescue = require('express-rescue');
const Products = require('../services/Products');
const SchemaProducts = require('../schemas/schemaProducts');

const { CREATED, OK_ } = require('../services/variableStatus');

const createProduct = rescue(async (req, res, next) => {

  const { error } = await SchemaProducts.validate(req.body);
  if (error) return next(error);

  const { name, quantity } = req.body;
  const product = await Products.createProduct({ name, quantity });
  if (product.error) return next(product.error);
  return res.status(CREATED).json(product);

});
const findAll = rescue(async (req, res, next) => {
  const products = await Products.findAll();
  if (products.error) return next(products.error);
  return res.status(OK_).json({ products });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (product.error) return next(product.error);
  return res.status(OK_).json( product );
});

module.exports = {
  createProduct,
  findAll,
  findById
};
