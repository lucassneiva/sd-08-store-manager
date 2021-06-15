const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId, ObjectID } = require('mongodb');

const { insertSales, getAllSales, getSaleByID } = require('../models/salesModels');

const { checkSalesCadastre } = require('../middleware/checkSales');

const router =  express.Router();
router.use(bodyParser.json());

const STATUS_201 = 201;
const STATUS_200 = 200;
const STATUS_404 = 404;

router.post('/', checkSalesCadastre, async (req, res) => {
  const sales  = req.body;
  const log = await insertSales(sales);
  res.status(STATUS_200).json(log);
});

router.get('/', async (req, res) => {
  const allSales = await getAllSales();
  res.status(STATUS_200).json({ sales: allSales});
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if ( !ObjectID.isValid(id)) {
    return res.status(STATUS_404).json(
      {
        'err': {
          'code': 'not_found',
          'message': 'Sale not found'
        }
      }
    );
  }
  const salesByID = await getSaleByID(id);
  res.status(STATUS_200).json(salesByID);
});


module.exports = router;
