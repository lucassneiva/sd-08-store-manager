const express = require('express');
const { addSale } = require('../services/salesService');
const router = express.Router();

const SUCCESS = 200;
// const CREATE_STATUS = 201;
const INVALID_DATA = 422;
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

router.post('/', validateDataQuantities, async (req, res) => {
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
});

module.exports = router;