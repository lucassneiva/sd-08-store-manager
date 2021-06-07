const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  addProducts,
  getByIdProducts,
  updateById,
  deleteById,
} = require('../../controllers/produto/produtoController');

const {
  validaNome,
  validaNumero,
  validaId,
  validaExiste,
} = require('../../middlewares');

router.get('/', getAllProducts);

router.post('/', validaNome, validaExiste, validaNumero, addProducts);

router.get('/:id', validaId, getByIdProducts);

router.put('/:id', validaNome, validaNumero, validaId, updateById);

router.delete('/:id', validaId, deleteById);

module.exports = router;
