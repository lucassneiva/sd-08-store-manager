const express = require('express');
const saleController = require('../controllers/saleController');
const {
  validQuantitySales
} = require('../middlewares/validations');

const router = express.Router();

router.post('/sales', validQuantitySales, saleController.addSales);
router.get('/sales', saleController.getAllSales);
router.get('/sales/:id', saleController.getSaleById);
router.put('/sales/:id',validQuantitySales , saleController.updateSale);
router.delete('/sales/:id', saleController.excludeSale);

module.exports = router;