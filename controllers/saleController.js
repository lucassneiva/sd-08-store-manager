const express = require('express');
const router = express.Router();
const saleModel = require('../models/saleModel');
const { saleQuatityCheck } = require('../services/saleService');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_ERROR_CLIENT = 422;
const STATUS_ERROR_SERVER = 500;
const messageErrorServer = {message: 'Sistema Indisponível'};

// Req05
router.post('/', saleQuatityCheck, async(req, res)=> {
  try {
    const salesArray = req.body;
    // console.log(salesArray);
    const newSale = await saleModel.addNewSale(salesArray);
    console.log(newSale);
    res.status(STATUS_OK).json(newSale);
  } catch (error) {
    console.log(erro.message);
    res.status(STATUS_ERRO).send(messageErrorServer);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const sales = await saleModel.getAll();
//     res.status(STATUS_OK).json(sales);
//   } catch (error) {
//     console.log(erro.message);
//     res.status(STATUS_ERRO).send(messageErrorServer);
//   }
// });

module.exports = router;