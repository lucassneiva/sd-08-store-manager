const express = require('express');
const app = express();

const sales = require('../controllers/sales');

app.post('/', sales.addSales);

module.exports = app;
