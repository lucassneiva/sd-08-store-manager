const express = require('express');
const { validateId } = require('../models/productsModel');
const { getSales, getSalesById, editSale } = require('../models/salesModel');
const { addSale } = require('../services/salesService');
const router = express.Router();

const SUCCESS = 200;
// const CREATE_STATUS = 201;
const INVALID_DATA = 422;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const INVALID_DATA_CODE = 'invalid_data';

const validateDataQuantities = (req, res, next) => {
  const itensSold = req.body;
  const err = itensSold.find(({ quantity }) => {
    return (typeof quantity === 'string') || 
          (quantity < 1);
  });
  if(err) return res.status(INVALID_DATA).json({
    err: {
      code: INVALID_DATA_CODE,
      message: 'Wrong product ID or invalid quantity'
    }
  });
  next();
};

const validateIdMiddleware = (req, _res, next) => {
  const { id } = req.params;
  if (!validateId(id)) {
    const err = new Error('Sale not found');
    err.status = NOT_FOUND;
    err.code = 'not_found';
    next(err);
  }
  next();
};

router.route('/')
  .post(validateDataQuantities, async (req, res) => {
    try { 
      const itensSold = req.body;
      const response = await addSale(itensSold);
      if(response instanceof Error) return res.status(INVALID_DATA).json({
        err: {
          code: INVALID_DATA_CODE,
          message: 'Wrong product ID or invalid quantity'
        }});
      res.status(SUCCESS).json(response);        
    } catch(err) {
      console.error(err);
      res.status(SERVER_ERROR).send('Error.');
    }
  })
  .get(async (_req, res) => {
    try { 
      const response = await getSales();
      res.status(SUCCESS).json({sales: response});
    } catch(err) {
      console.error(err);
      res.status(SERVER_ERROR).send('Error');
    }
  });

router.route('/:id')
  .get(validateIdMiddleware, async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await getSalesById(id);
      if (!response) {
        const err = new Error('Sale not found');
        err.status = NOT_FOUND;
        err.code = 'not_found';
        next(err);
      }
      res.status(SUCCESS).json(response);
    } catch (err) {
      console.error(err);
      res.status(SERVER_ERROR).send('Error.');
    }
  })
  .put(validateDataQuantities, validateIdMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const itensSold = req.body;
      await editSale(id, itensSold);
      res.status(SUCCESS).json({_id: id, itensSold});
    } catch(err) {
      console.error(err);
      res.status(SERVER_ERROR).send('Error.');
    }
  });

router.use((err, _req, res, _next) => { 
  res.status(err.status).json({ err: { code: err.code, message: err.message }}); 
});

module.exports = router;