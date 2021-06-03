const express = require('express');
const SaleController = require('../../controllers/Sale');
const middleware = require('../../middlewares');

const router = express.Router();

router.post('/', middleware.isSaleValid, SaleController.create);

module.exports = router;
