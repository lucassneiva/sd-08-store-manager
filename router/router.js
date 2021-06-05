const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  addProducts,
  getByIdProducts,
  updateById,
} = require('../controllers/produtoController');

const {
  validaNome,
  validaNumero,
  validaId,
} = require('../middlewares');

router.get('/', getAllProducts);

router.post('/', validaNome, validaNumero, addProducts);

router.get('/:id', validaId, getByIdProducts);

router.put('/:id', validaNome, validaNumero, validaId, updateById);

module.exports = router;
