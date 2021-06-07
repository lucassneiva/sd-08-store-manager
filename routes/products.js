const express = require('express');
const app = express();

const products = require('../controllers/products');

app.post('/', products.addProduct);

app.get('/', products.getProducts);

app.get('/:id', products.getProductById);

module.exports = app;
