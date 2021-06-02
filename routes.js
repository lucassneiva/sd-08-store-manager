const routes = require('express').Router();

const ProductsController = require('./controllers/ProductsController');

const CreateProduct = require('./middlewares/CreateProduct');
const ListProduct = require('./middlewares/ListProduct');

routes.get('/products', ProductsController.index);
routes.get('/products/:id', ListProduct, ProductsController.indexOne);
routes.post('/products', CreateProduct, ProductsController.create);

module.exports = routes;
