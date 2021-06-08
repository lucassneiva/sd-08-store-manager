const express = require('express'); 
const {validateIfNameExists, 
  validateProduct} = require('../middlewares/productMiddleware');


const{
  controllerProduct,
  controllerAllProduct, 
  controllerById,
  controllerUpdate} = require('../controllers/product');

const routeProduct = express.Router();


routeProduct.get('/products/:id', controllerById);
routeProduct.put('/products/:id', validateProduct, controllerUpdate);
routeProduct.get('/products', controllerAllProduct);
routeProduct.post('/products', validateProduct, validateIfNameExists, controllerProduct);


module.exports = {
  routeProduct
};
