const express = require('express');
const saleController = require('../controllers/saleController');
const {
  validQuantitySales
} = require('../middlewares/validations');

const router = express.Router();

router.post('/sales', validQuantitySales, saleController.addSales);
router.get('/sales', saleController.getAllSales);

module.exports = router;