const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/Sales');
const middlewares = require('../middlewares');

router.post('/', middlewares.validateSale, SalesController.create);
router.get('/', SalesController.getAll);
router.get('/:id', SalesController.getById);
router.put('/:id', middlewares.validateSale, SalesController.edit);
router.delete('/:id', SalesController.remove);

module.exports = router;
