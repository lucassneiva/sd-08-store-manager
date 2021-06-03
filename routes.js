const routes = require('express').Router();

const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');

const CreateProduct = require('./middlewares/CreateProduct');
const ShowProduct = require('./middlewares/ShowProduct');
const UpdateProduct = require('./middlewares/UpdateProduct');
const DeleteProduct = require('./middlewares/DeleteProduct');

const CreateSale = require('./middlewares/CreateSale');
const ShowSale = require('./middlewares/ShowSale');

routes.get('/products', ProductsController.index);
routes.get('/products/:id', ShowProduct, ProductsController.indexOne);
routes.post('/products', CreateProduct, ProductsController.create);
routes.put('/products/:id', UpdateProduct, ProductsController.update);
routes.delete('/products/:id', DeleteProduct, ProductsController.delete);

routes.get('/sales', SalesController.index);
routes.get('/sales/:id', ShowSale, SalesController.indexOne);
routes.post('/sales', CreateSale, SalesController.create);

module.exports = routes;
