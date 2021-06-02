const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/Sales');
const middlewares = require('../middlewares');

router.post('/', middlewares.validateSale, SalesController.create);
router.get('/', SalesController.getAll);
router.get('/:id', SalesController.getById);

module.exports = router;
