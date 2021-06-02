const express = require('express');
const route = express.Router();
const middlewares = require('../middlewares');
const ProductsController = require('../controllers/Products');

route.post('/', middlewares.validateProduct ,ProductsController.create);
route.get('/:id', ProductsController.getById);
route.get('/', ProductsController.getAll);
route.put('/:id', middlewares.validateProduct, ProductsController.edit);
route.delete('/:id', ProductsController.remove);

module.exports = route;
