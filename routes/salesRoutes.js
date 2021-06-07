const express = require('express');
const { 
  createSale, 
  checkIds,
  checkQuantities,
  getAllSales,
  getOneSale,
  updateSale,
  deleteSale
} = require('../controller/salesController');

const salesRoute = express.Router();

salesRoute.post('/', checkQuantities, checkIds, createSale);

salesRoute.get('/:id', getOneSale);

salesRoute.get('/', getAllSales);

salesRoute.put('/:id', checkQuantities, updateSale);

salesRoute.delete('/:id', deleteSale);

module.exports = salesRoute;