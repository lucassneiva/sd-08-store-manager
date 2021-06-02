const express = require('express');
const ProductsController = require('./controllers/ProductsController');
const { fieldsValidation } = require('./middlewares/ProductValidation');
const router = express.Router();

router.post('/products', fieldsValidation, ProductsController.add);
module.exports = router;
