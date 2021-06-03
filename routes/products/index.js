const express = require('express');
const ProductController = require('../../controllers/Product');
const middlewares = require('../../middlewares');

const router = express.Router();

router.post('/', middlewares.isProductValid, ProductController.create);

module.exports = router;
