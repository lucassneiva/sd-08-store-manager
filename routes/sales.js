const express = require('express');
const app = express();

const sales = require('../controllers/sales');

app.post('/', sales.addSales);

app.get('/', sales.getSales);

app.get('/:id', sales.getSaleById);

app.put('/:id', sales.updateSales);

app.delete('/:id', sales.deleteSale);

module.exports = app;
