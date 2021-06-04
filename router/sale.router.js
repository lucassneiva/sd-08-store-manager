const express = require('express');
const rescue = require('express-rescue');
const { saleController } = require('../controllers');
const { form: {registerSale}} = require('../Middlewares');

const router = express.Router();

router.get('/', saleController.getAll);
router.get('/:id', saleController.getById);
router.post('/', rescue(registerSale), saleController.post);

module.exports = router;
