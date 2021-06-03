const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  addProducts,
  getByIdProducts,
} = require('../controllers/produtoController');

const {
  validaNome,
  validaNumero,
  validaId,
 } = require('../middlewares');

router.get('/', getAllProducts);

router.post('/', validaNome, validaNumero, addProducts);

router.get('/:id', validaId, getByIdProducts);

module.exports = router;
