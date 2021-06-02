const express = require('express');
const control = require('../controller/controller');
const salesControl = require('../controller/salesController');
const Router = express.Router();


Router.post('/products', control.userController);

Router.get('/products', control.getAllProducts);
Router.get('/products/:id', control.getProductById);
Router.put('/products/:id', control.updateProduct);
Router.delete('/products/:id', control.excludeProduct);

Router.post('/sales', salesControl.create);
Router.get('/sales', salesControl.getAll);
Router.get('/sales/:id', salesControl.getSaleById);
Router.delete('/sales/:id', salesControl.excludeSale);





module.exports = Router;
