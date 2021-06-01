const express = require('express');
const control = require('../controller/controller');
const Router = express.Router();

const ok = 200;

Router.post('/products', control.userController);

Router.get('/products', control.getAllProducts);
Router.get('/products/:id', control.getProductById);

module.exports = Router;
