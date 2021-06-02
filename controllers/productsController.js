const express = require('express');
const router = express.Router();
const { 
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
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
  const productById = await getProductById(id);
  
  if(productById.err) {
    return res.status(UNPROCESSABLE).json(productById);
  }
  res.status(OK).json(productById);
});

router.put('/:id', async(req, res) => {
  const {id} = req.params;
  const {name, quantity} = req.body;

  const updatedProduct = await updateProduct(id, name, quantity);

  if(updatedProduct.err) return res.status(UNPROCESSABLE).json(updatedProduct);

  res.status(OK).json(updatedProduct);
});

router.delete('/:id', async(req, res) => {
  const {id} = req.params;
  const deletedProduct = await deleteProduct(id);

  if(deletedProduct.err) return res.status(UNPROCESSABLE).json(deletedProduct);

  res.status(OK).json(deleteProduct);
});

module.exports = router;
