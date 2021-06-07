const express = require('express');
const app = express();

const products = require('../controllers/products');

app.post('/', products.addProduct);

app.get('/', products.getProducts);

app.get('/:id', products.getProductById);

app.put('/:id', products.updateProduct);

module.exports = app;
