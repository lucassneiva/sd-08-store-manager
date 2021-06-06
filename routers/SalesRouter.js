const router = require('express').Router();
const SalesController = require('../controllers/SalesController');

router.post('/', SalesController.registerSale);
router.get('/', SalesController.getAllSales);
router.get('/:id', SalesController.getSalesByID);

module.exports = router;

