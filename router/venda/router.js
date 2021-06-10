const express = require('express');
const router = express.Router();

const {
  criarVenda,
  todasVendas,
  idVenda,
  updateVenda,
  deleteVenda,
} = require('../../controllers/venda/vendaController');

const {
  validaNumeroVenda,
  validaIdVenda,
  validaIdDelete,
} = require('../../middlewares');

router.get('/', todasVendas);
router.get('/:id', validaIdVenda, idVenda);

router.post('/', validaNumeroVenda, criarVenda);

router.put('/:id', validaNumeroVenda, updateVenda);

router.delete('/:id', validaIdDelete, deleteVenda);


module.exports = router;
