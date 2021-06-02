const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/Sales');
const middlewares = require('../middlewares');

router.post('/', middlewares.validateSale, SalesController.create);

module.exports = router;
