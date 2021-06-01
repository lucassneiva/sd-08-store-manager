const express = require('express');
const router = express.Router();

const SalesValidate = require('../services/salesValidate');

const STATUS_ERROR = 500;

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const { 
      code, 
      message, 
      result 
    } = await SalesValidate.addSalesProductValidated(data);
    if (!result) {
      return res.status(code).json({
        err: {
          code: 'invalid_data',
          message,
        }
      });
    }
    res.status(code).json(result);
  } catch (e) {
    res.status(STATUS_ERROR).send({ message: 'Algo deu errado!' });
  }

});

module.exports = router;