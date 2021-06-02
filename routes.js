const routes = require('express').Router();

const ProductsController = require('./controllers/ProductsController');

const ProductsMiddleware = require('./middlewares/ProductsMiddleware');

routes.get('/products', ProductsController.index);
routes.get('/products/:id', ProductsController.indexOne);
routes.post('/products', ProductsMiddleware, ProductsController.create);

module.exports = routes;
