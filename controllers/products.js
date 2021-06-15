const express = require('express');
const bodyParser = require('body-parser');
const { checkProduct, checkID } = require('../middleware/middleware');

const {
  createProduct,
  findProduct,
  getAllProducts,
  getByID,
  updateProduct,
  deleteProduct
} = require('../models/productModels');

const STATUS_201 = 201;
const STATUS_200 = 200;

const router =  express.Router();
router.use(bodyParser.json());

router.post('/', checkProduct,   async (req, res) => {
  const { name, quantity } = req.body;
  createProduct({name, quantity});
  const productFinded = await findProduct({name});
  res.status(STATUS_201).send(productFinded);
});

router.get('/:id', checkID, async (req, res) => {
  const { id } = req.params;
  const product = await getByID(id);
  res.status(STATUS_200).send(product);
});

router.get('/', async (req, res) => {
  const allProducts = await getAllProducts();
  res.status(STATUS_200).send({ 'products': allProducts});
});

router.put('/:id', checkProduct, async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  updateProduct(id,name, quantity );
  const product = await getByID(id);
  res.status(STATUS_200).send(product);
});

router.delete('/:id', checkID, async (req, res) => {
  const { id } = req.params;
  const product = await getByID(id);
  res.status(STATUS_200).send(product);
  deleteProduct(id);
});

module.exports = router;
