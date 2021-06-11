const express = require('express');
const products = require('../controllers/ProductsController');
const sales = require('../controllers/SalesController');
const Router = express.Router();

/* ROTAS PARA PRODUCTS */
Router.post('/products', products.createProduct);
Router.get('/products', products.getAllProducts);
Router.get('/products/:id', products.getProductById);
Router.put('/products/:id', products.updateProduct);
Router.delete('/products/:id', products.deleteProduct);

/* ROTAS PARA SALES */
Router.post('/sales', sales.create);
Router.get('/sales', sales.getAll);
Router.get('/sales/:id', sales.getSaleById);
Router.delete('/sales/:id', sales.deleteSale);
Router.put('/sales/:id', sales.updateSale);

module.exports = Router;
