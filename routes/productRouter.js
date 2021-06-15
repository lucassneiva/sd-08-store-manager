const express = require('express');
const productController = require('../controllers/productController');
const middlewares = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => await middlewares.nameValidation(req, res, next),
  middlewares.quantityValidation,
  async (req, res) => await productController.create(req, res),
);

router.get('/', async (req, res) => await productController.getAll(req, res));

router.get(
  '/:id',
  middlewares.idValidation,
  async (req, res) => await productController.getProductById(req, res),
);

router.put(
  '/:id',
  middlewares.nameValidation,
  middlewares.quantityValidation,
  middlewares.idValidation,
  async (req, res) => await productController.updateProduct(req, res),
);

module.exports = router;
