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

const getProducts = async (_req, res) => {
  const result = await products.getProducts();
  res.status(SUCCESS).json({ products: result });
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await products.getProductById(id);
  if(product.err) return res.status(FAILURE).json({ err: product.err });
  res.status(SUCCESS).json(product.data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await products.updateProduct(id, name, quantity);
  if(result && result.err) return res.status(FAILURE).json({ err: result.err });
  if(!result) return res.status(SYSTEM_FAILURE).send();
  res.status(SUCCESS).json(result.data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await products.deleteProduct(id);
  if(deletedProduct && deletedProduct.err) (
    res.status(FAILURE).json({ err: deletedProduct.err })
  );
  if(!deletedProduct) return res.status(SYSTEM_FAILURE).send();
  res.status(SUCCESS).json(deletedProduct.data);
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
