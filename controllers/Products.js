const Products = require('../services/Products');
const rescue = require('express-rescue');

const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const add = async (req, res) => {
  const newProduct = req.body;

  const product = await Products.add(newProduct);

  if(product.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(product);
  }

  return res.status(CREATED).json(product);
};

module.exports = {
  add,
};
