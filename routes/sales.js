const express = require('express');
const salesController = require('../controllers/salesControllers');
const router = express.Router();

router.get('/:id', salesController.getSaleById);
router.get('/', salesController.getAllSales);
router.post('/', salesController.insertSale);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

module.exports = router;
