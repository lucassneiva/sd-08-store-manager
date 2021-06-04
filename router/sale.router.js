const express = require('express');
const rescue = require('express-rescue');
const { saleController } = require('../controllers');
const { form: {registerSale}} = require('../Middlewares');

const router = express.Router();

router.get('/', saleController.getAll);
router.get('/:id', saleController.getById);
router.post('/', rescue(registerSale), saleController.post);
router.put('/:id', rescue(registerSale), saleController.put);
router.delete('/:id', saleController.delete);

module.exports = router;
