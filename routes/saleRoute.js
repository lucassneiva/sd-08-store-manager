const express = require('express');
const saleController = require('../controllers/saleController');
// const { getName } = require('../middlewarers/productMimiddlewarers/nameValidate');
const { getQuantity } = require('../middlewarers/saleMiddlewarers/quantityValidade');

const router = express.Router();

router.get('/sales', saleController.getAllSales);
router.get('/sales/:id', saleController.getSaleById);
router.post('/sales', getQuantity,saleController.addSales);
router.put('/sales/:id', getQuantity, saleController.updateSale);
router.delete('/sales/:id', saleController.deleteSale);

module.exports = router;
