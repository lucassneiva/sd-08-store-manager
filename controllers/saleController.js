const express = require('express');
const router = express.Router();
const saleModel = require('../models/saleModel');

const STATUS_OK = 200;
const STATUS_CREATE = 201;
const STATUS_ERRO = 404;

router.get('/', async (req, res) => {
  try {
    const sales = await saleModel.getAll();
    res.status(STATUS_OK).json(sales);
  } catch (error) {
    console.log(erro.message);
    res.status(STATUS_ERRO).send({message: 'Sistema Indisponível'});
  }
});
module.exports = router;