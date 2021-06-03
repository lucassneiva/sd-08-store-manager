const express = require('express');
const ProductController = require('../../controllers/Product');
const middlewares = require('../../middlewares');

const router = express.Router();

router.post('/', middlewares.isProductValid, ProductController.create);

router.get('/:id', ProductController.findById);

router.get('/', ProductController.getAll);

router.put('/:id', middlewares.isProductValid, ProductController.update);

module.exports = router;
