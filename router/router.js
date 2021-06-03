const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  addProducts,
  getByIdProducts,
} = require('../controllers/produtoController');

const { validaName, validaNumero } = require('../middlewares');

router.get('/', getAllProducts);

router.post('/', validaName, validaNumero, addProducts);

router.get('/:id', getByIdProducts);

module.exports = router;
