const express = require('express');
const app = express();

const products = require('../controllers/products');

app.post('/', products.addProduct);

module.exports = app;
