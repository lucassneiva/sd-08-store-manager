const express = require('express');
const { getProducts } = require('../models/productsModel');
const { addProduct, getProductById } = require('../services/productsService');
const router = express.Router();

const GET_STATUS = 200;
const CREATE_STATUS = 201;
const INVALID_DATA = 422;
const SERVER_ERROR = 500;
const INVALID_DATA_CODE = 'invalid_data';

router.route('/')
  .post(async (req, res) => {
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
      res.status(GET_STATUS).json({'products': response});
    } catch(err) {
      console.error(err);
      res.status(SERVER_ERROR).send('Error');
    }
  });

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getProductById(id);
    if(response instanceof Error) {
      return res.status(INVALID_DATA)
        .json({err: {code: INVALID_DATA_CODE, message: response.message}});
    }
    res.status(GET_STATUS).json(response);
  } catch(err) {
    console.error(err);
    res.status(SERVER_ERROR).send('Error.');
  }
});

module.exports = router;