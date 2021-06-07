const express = require('express');
const rescue = require('express-rescue');
const salesControllers = require('../controllers/salesControllers');
const { validateSale, checkQuantity } = require('../middlewares/salesMiddlewares');

const router = express.Router();

router.post('/sales',  rescue(validateSale, checkQuantity), salesControllers.createSale);
router.get('/sales', salesControllers.getAllSales);
router.get('/sales/:id', salesControllers.getSaleById);
router.put('/sales/:id', rescue(validateSale), salesControllers.updateSale);
router.delete('/sales/:id', salesControllers.deleteSale);

module.exports = router;
