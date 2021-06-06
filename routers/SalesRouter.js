const router = require('express').Router();
const SalesController = require('../controllers/SalesController');

router.post('/', SalesController.registerSale);
router.get('/', SalesController.getAllSales);
router.get('/:id', SalesController.getSalesByID);
router.put('/:id', SalesController.updateSaleByID);
router.delete('/:id', SalesController.deleteSaleByID);


module.exports = router;

