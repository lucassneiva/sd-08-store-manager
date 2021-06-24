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

const create = async (req, res) => {
  const { name, quantity } = req.body;
  createProduct({name, quantity});
  const productFinded = await findProduct({name});
  res.status(STATUS_201).send(productFinded);
};

router.post('/', checkProduct, create);

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await getByID(id);
  res.status(STATUS_200).send(product);
};

router.get('/:id', checkID, findById);

const getAll = async (req, res) => {
  const allProducts = await getAllProducts();
  res.status(STATUS_200).send({ 'products': allProducts});
};

router.get('/', getAll );

const updateProductController = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  updateProduct(id,name, quantity );
  const product = await getByID(id);
  res.status(STATUS_200).send(product);
};

router.put('/:id', checkProduct, updateProductController );

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const product = await getByID(id);
  res.status(STATUS_200).send(product);
  deleteProduct(id);
};

router.delete('/:id', checkID, deleteProductController );

module.exports = {
  router,
  create,
  findById,
  getAll,
  updateProductController,
  deleteProductController
};
