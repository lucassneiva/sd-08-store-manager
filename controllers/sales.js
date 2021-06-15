const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId, ObjectID } = require('mongodb');

const {
  insertSales,
  getAllSales,
  getSaleByID,
  updateSale,
  deleteSale,
} = require('../models/salesModels');

const {
  checkSalesCadastre,
  checkID,
  checkIfSaleExist
} = require('../middleware/checkSales');

const router =  express.Router();
router.use(bodyParser.json());

const STATUS_201 = 201;
const STATUS_200 = 200;
const STATUS_404 = 404;
const STATUS_422 = 422;

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

router.put('/:id',checkSalesCadastre , async (req, res) => {
  const { productId, quantity } = req.body[0];
  const { id } = req.params;
  updateSale(id, productId, quantity );
  const sale = await getSaleByID(id);
  res.status(STATUS_200).send(sale);
});

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   const sale = await getSaleByID(id);
//   console.log(sale);
//   const tra = await deleteSale(id);
//   return res.status(STATUS_200).json(sale);
// });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const idLength = 24;
  if(id.length !== idLength) {
    return res.status(STATUS_422)
      .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' }});
  }
  const sale = await getSaleByID(id);
  if (!sale) return res.status(404)
    .json({ err: { code: 'not_found', message: 'Sale not found' }});
  const tra = await deleteSale(id);
  return res.status(STATUS_200).json(sale);
});

module.exports = router;
