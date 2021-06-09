const express = require('express');
const router = express.Router();

const {
  criarVenda,
  todasVendas,
  idVenda,
  updateVenda,
} = require('../../controllers/venda/vendaController');

const {
  validaNumeroVenda,
  validaIdVenda,
} = require('../../middlewares');

router.get('/:id', validaIdVenda, idVenda);
router.get('/', todasVendas);

router.post('/', validaNumeroVenda, criarVenda);

router.put('/:id', validaNumeroVenda, updateVenda);


module.exports = router;
