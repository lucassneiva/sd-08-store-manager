const express = require('express');

const { salesController } = require('../controllers');
const {
  salesCreate,
  salesReader,
  salesReaderById,
} = salesController;

const salesRouter = express.Router();

salesRouter.post('/sales', salesCreate);
salesRouter.get('/sales', salesReader);
salesRouter.get('/sales/:id', salesReaderById);

module.exports = salesRouter;