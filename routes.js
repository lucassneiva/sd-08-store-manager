const routes = require('express').Router();

const ProductsController = require('./controllers/ProductsController');

const CreateProduct = require('./middlewares/CreateProduct');
const ShowProduct = require('./middlewares/ShowProduct');
const UpdateProduct = require('./middlewares/UpdateProduct');

routes.get('/products', ProductsController.index);
routes.get('/products/:id', ShowProduct, ProductsController.indexOne);
routes.post('/products', CreateProduct, ProductsController.create);
routes.put('/products/:id', UpdateProduct, ProductsController.update);

module.exports = routes;
