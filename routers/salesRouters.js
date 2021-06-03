const express = require('express');
const salesControllers = require('../controllers/salesControllers');
const { validateSale } = require('../middlewares/salesMiddlewares');

const router = express.Router();

router.post('/sales', validateSale, salesControllers.createSale);
router.get('/sales', salesControllers.getAllSales);
//router.get('/sales/:id', salesControllers.getSaleById);
//router.put('/sales/:id', validateProduct, salesControllers.updateSale);
//router.delete('/sales/:id', salesControllers.deleteSale);

module.exports = router;
