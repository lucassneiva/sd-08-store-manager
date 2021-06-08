const express = require('express');
const rescue = require('express-rescue');
const { 
  tryAddProduct,
  tryUpdate,
  findAllProduct,
  findProduct,
  findToDelete } = require('../service/productsService');

const router = express.Router();

// 1 - Crie um endpoint para o cadastro de produtos
router.post('/', rescue(async (req, res) => {
  const end = await tryAddProduct(req, res);
  return end;
}));

// 3 - Crie um endpoint para atualizar um produto
router.put('/:id', rescue(async (req, res) => {
  const end = await tryUpdate(req, res);
  return end;
}));

// 2 - Crie um endpoint para listar os produtos
router.get('/:id', rescue(async (req, res) => {
  const end = await findProduct(req, res);
  return end;
}));

router.get('', rescue(async (_req, res) => {
  const end = await findAllProduct(res);
  return end;
}));

// 4 - Crie um endpoint para deletar um produto
router.delete('/:id', rescue(async (req, res) => {
  const end = await findToDelete(req, res);
  return end;
}));

module.exports = {
  router,
};