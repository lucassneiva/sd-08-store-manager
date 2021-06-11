const express = require('express');
const productController = require('../controllers/productController');
const nameValidation = require('../middlewares/nameValidation');

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => await nameValidation(req, res, next),
  async (req, res) => await productController.create(req, res),
);

module.exports = router;
