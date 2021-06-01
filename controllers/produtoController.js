const express = require('express');
const router = express.Router();

const { getAllProtudos, addProtudos } = require('../services/produtoServices');
const { validaName, validaNumero } = require('../middlewares');
const SUCESSO = 201;
const ERRO_CONEXAO = 500;

router.get('/', async (_req, res) => {
  try {
    const allProtudos = await getAllProtudos();

    res.status(SUCESSO).json(allProtudos);
  } catch (error) {
    res.status(ERRO_CONEXAO).json({ message: 'Fatal Error 500' });
  }
});

router.post('/',
  validaName, validaNumero,
  async (req, res) => {
    try {
      const produto = await addProtudos(req.body);
      res.status(SUCESSO).json(produto);
    } catch (error) {
      res.status(ERRO_CONEXAO).json({ message: 'Fatal Error 500' });
    }
  }
);

module.exports = router;
