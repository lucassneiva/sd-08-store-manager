const { Router } = require('express');
const { createProduct } = require('../middlewares/ProductsMiddleware');
const { validateProduct } = require('../middlewares/ValidateMiddleware');

const router = Router();

router.post('/', [validateProduct, createProduct]);

module.exports = router;
