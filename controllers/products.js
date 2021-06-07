const products = require('../services/products');

const CREATE = 201;
const SUCCESS = 200;
const FAILURE = 422;
const SYSTEM_FAILURE = 500;

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await products.addProduct(name, quantity);
  if(product && product.err) return res.status(FAILURE).json({ err: product.err });
  if(!product) return res.status(SYSTEM_FAILURE).send();
  res.status(CREATE).json(product.data);
};

module.exports = {
  addProduct,
};
