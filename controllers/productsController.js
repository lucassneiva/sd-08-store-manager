const express = require('express');
const router = express.Router();
const { 
  addProduct,
  getAllProducts,
  getProductById
} = require('../services/productServices');

const UNPROCESSABLE = 422;
const CREATED = 201;
const OK = 200;

router.post('/',  async (req, res) => {
  const { name, quantity } = req.body;
  const addedProduct = await addProduct(name, quantity);
  if(addedProduct.err) {
    return res.status(UNPROCESSABLE).json(addedProduct);
  };
  res.status(CREATED).json(addedProduct);
});

router.get('/', async (_req, res) => {
  const allProducts = await getAllProducts();
  return res.status(OK).json({products: allProducts});
} 
);

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  console.log(id);
  const productById = await getProductById(id);
  // console.log(productById);
  if(productById.err) {
    return res.status(UNPROCESSABLE).json(productById);
  }
  res.status(OK).json(productById);
});

module.exports = router;
