const routes = require('express').Router();

const ProductsController = require('./controllers/ProductsController');

const ProductsMiddleware = require('./middlewares/ProductsMiddleware');

routes.post('/products', ProductsMiddleware, ProductsController.create);

module.exports = routes;
