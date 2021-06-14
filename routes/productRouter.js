const express = require('express');
const productController = require('../controllers/productController');
const nameValidation = require('../middlewares/nameValidation');
const quantityValidation = require('../middlewares/quantityValidation');

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => await nameValidation(req, res, next),
  quantityValidation,
  async (req, res) => await productController.create(req, res),
);

router.get('/', async (req, res) => await productController.getAll(req, res));

module.exports = router;
