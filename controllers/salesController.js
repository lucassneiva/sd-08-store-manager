const express = require('express');
const router = express.Router();

// const {
//   addSales,
// } = require('../services/SalesServices');

// const { getAllProducts } = require('../services/ProductsServices');

// const { validateSale } = require('../schema/SaleSchema');

const OK = 200;
const UNPROCESSABLE_ENTITY = 422;
const ERROR = 500;
const message = 'There is something wrong';

router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    console.log(productId, quantity);
    const products = await getAllProducts({ productId, quantity });
    // const sales = await addSales(productId, quantity);
    // res.status(OK).json(sales.ops[0]);
  } catch (err) {
    console.log(err);
    res.status(ERROR).json({ message });
  }
});

module.exports = router;
