const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const {
  insertSales,
  getAllSales,
  getSaleByID,
  updateSale,
  deleteSaleById,
  updateProductOnSale
} = require('../models/salesModels');

const { getByID } = require('../models/productModels');

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

const insertSaleController = async (req, res) => {
  const sales  = req.body;
  const log = await insertSales(sales);
  const { itensSold } = log;
  const { productId, quantity } = itensSold[0];
  const ops = await getByID(productId);
  if(quantity > ops.quantity) {
    return res.status(STATUS_404).json(
      {
        'err': {
          'code': 'stock_problem',
          'message': 'Such amount is not permitted to sell'
        }
      }
    );
  }
  await updateProductOnSale(productId , ops.quantity - quantity );
  res.status(STATUS_200).json(log);
};

router.post('/', checkSalesCadastre, insertSaleController );

const getAllSalesController = async (req, res) => {
  const allSales = await getAllSales();
  res.status(STATUS_200).json({ sales: allSales});
};

router.get('/', getAllSalesController );

const getSaleByIdController = async (req, res ) => {
  const { id } = req.params;

  if ( !ObjectId.isValid(id)) {
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

  if (!salesByID) {
    return res.status(STATUS_404)
      .json({ err: { code: 'not_found', message: 'Sale not found' }});
  }
  res.status(STATUS_200).json(salesByID);
};

router.get('/:id', getSaleByIdController );

const updateSaleController = async (req, res) => {
  const { productId, quantity } = req.body[0];
  const { id } = req.params;
  updateSale(id, productId, quantity );
  const sale = await getSaleByID(id);
  res.status(STATUS_200).send(sale);
};

router.put('/:id',checkSalesCadastre , updateSaleController );

const deleteSaleController = async (req, res) => {
  const { id } = req.params;
  const IDLENGTH = 24;
  if(id.length !== IDLENGTH) {
    return res.status(STATUS_422)
      .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' }});
  }
  const sale = await getSaleByID(id);
  if (!sale) {
    return res.status(STATUS_404)
      .json({ err: { code: 'not_found', message: 'Sale not found' }});
  }
  const deleted = await deleteSaleById(id);
  const { itensSold } = sale;
  const { productId, quantity } = itensSold[0];
  const ops = await getByID(productId);
  await updateProductOnSale(productId , ops.quantity + quantity );
  return res.status(STATUS_200).json(sale);
};

router.delete('/:id', deleteSaleController );

module.exports = { router,
  insertSaleController,
  getAllSalesController,
  getSaleByIdController,
  updateSaleController,
  deleteSaleController,
};
