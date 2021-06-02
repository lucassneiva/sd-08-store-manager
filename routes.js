const express = require('express');
const ProductsController = require('./controllers/ProductsController');
const { fieldsValidation } = require('./services/ProductValidation');
const router = express.Router();

router.post('/products', fieldsValidation, ProductsController.add);
router.get('/products', ProductsController.getAll);
router.get('/products/:id', ProductsController.getOne);
router.put('/products/:id', fieldsValidation, ProductsController.edit);
module.exports = router;
