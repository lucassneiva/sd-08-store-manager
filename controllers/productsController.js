const express = require('express');
const { getProducts, validateId, editProduct } = require('../models/productsModel');
const { addProduct, 
  getProductById, 
  deleteProduct } = require('../services/productsService');
const router = express.Router();

const SUCCESS = 200;
const CREATE_STATUS = 201;
const INVALID_DATA = 422;
const SERVER_ERROR = 500;
const INVALID_DATA_CODE = 'invalid_data';

const validateIdMiddleware = (req, res, next) => {
  const { id } = req.params;
  if(!validateId(id)) {
    return res.status(INVALID_DATA)
      .json({err: {code: INVALID_DATA_CODE, message: 'Wrong id format'}});
  }
  next();
};

const validateDataMiddleWare = (req, res, next) => {
  const { name, quantity } = req.body;
  const MIN_NAME_LENGTH = 5;
  let err = '';
  if(name.length < MIN_NAME_LENGTH) {
    err = '"name" length must be at least 5 characters long';
  }
  if(typeof quantity === 'string') {
    err = '"quantity" must be a number';
  }
  if(quantity < 1) {
    err = '"quantity" must be larger than or equal to 1';
  }
  if(err) return res.status(INVALID_DATA)
    .json({err: {code: INVALID_DATA_CODE, message: err}});
  next();
};

router.route('/')
  .post(validateDataMiddleWare, async (req, res) => {
    try {
      const data = req.body;
      const response = await addProduct(data);
      if(response instanceof Error) {
        return res.status(INVALID_DATA)
          .json({err: {code: INVALID_DATA_CODE, message: response.message}});
      }
      res.status(CREATE_STATUS).json(response);
    } catch(err) {
      res.status(SERVER_ERROR).send('Error.');
    }
  })
  .get(async (_req, res) => {
    try { 
      const response = await getProducts();
      res.status(SUCCESS).json({'products': response});
    } catch(err) {
      console.error(err);
      res.status(SERVER_ERROR).send('Error');
    }
  });


router.route('/:id')
  .all(validateIdMiddleware)
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const response = await getProductById(id);
      if(response instanceof Error) {
        return res.status(INVALID_DATA)
          .json({err: {code: INVALID_DATA_CODE, message: response.message}});
      }
      res.status(SUCCESS).json(response);
    } catch(err) {
      console.error(err);
      res.status(SERVER_ERROR).send('Error.');
    }
  })
  .put(validateDataMiddleWare, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;
      await editProduct(id, name, quantity);
      res.status(SUCCESS).json({_id: id, name, quantity});
    } catch(err) {
      console.error(err);
      res.status(SERVER_ERROR).send('Error.');
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const response = await deleteProduct(id);
      if (response instanceof Error) {
        return res
          .status(INVALID_DATA)
          .json({ err: { code: INVALID_DATA_CODE, message: response.message } });
      }
      res.status(SUCCESS).json(response);
    } catch (err) {
      console.error(err);
      res.status(SERVER_ERROR).send('Error.');
    }
  })
;

module.exports = router;