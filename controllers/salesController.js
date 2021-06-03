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
    const stockProblem = await SalesValidate.updateQuantity(data);
    console.log(stockProblem);
    if (!result) {
      return res.status(code).json({
        err: {
          code: 'invalid_data',
          message,
        }
      });
    }
    if (stockProblem) {
      return res.status(stockProblem.code).json({
        err: {
          code: 'stock_problem',
          message: stockProblem.message,
        }
      });
    }
    res.status(code).json(result);
  } catch (e) {
    res.status(STATUS_ERROR).send({ message: 'Algo deu errado!' });
  }
});

router.get('/', async (_req, res) => {
  const { code, result } = await SalesValidate.getAll();
  res.status(code).json({
    sales: result,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { code, message, result } = await SalesValidate.getById(id);
    if (!result) {
      return res.status(code).json({
        err: {
          code: 'not_found',
          message,
        }
      });
    }
    res.status(code).json(result);
  } catch (e) {
    console.error(e);
  }
});

router.put('/:id', async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const { 
      code, 
      message, 
      result 
    } =  await SalesValidate.updateSale(id, data);
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
    console.error(e);
  }
}); 

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {    
    const { code, message, result } = await SalesValidate.deleteSale(id);
    // await SalesValidate.productAfterDeleteSale(id);
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
    console.error(e);
  }
});

module.exports = router;