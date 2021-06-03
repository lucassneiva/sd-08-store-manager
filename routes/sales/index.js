const express = require('express');
const SaleController = require('../../controllers/Sale');
const middleware = require('../../middlewares');

const router = express.Router();

router.post('/', middleware.isSaleValid, SaleController.create);

router.get('/:id', SaleController.findById);

router.get('/', SaleController.getAll);

router.put('/:id', middleware.isSaleValid, SaleController.update);

module.exports = router;
