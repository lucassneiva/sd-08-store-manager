const express = require('express');
const router = express.Router();

const {
  criarVenda,
} = require('../../controllers/venda/vendaController');

const {
  validaNumeroVenda
} = require('../../middlewares');

router.post('/', validaNumeroVenda, criarVenda);

module.exports = router;
