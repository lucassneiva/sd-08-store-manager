const express = require('express'); 
const {validateIfNameExists, 
  validateProduct} = require('../middlewares/productMiddleware');


const{
  controllerProduct,
  controllerAllProduct, 
  controllerById} = require('../controllers/product');

const routeProduct = express.Router();

routeProduct.post('/products', validateProduct, validateIfNameExists, controllerProduct);
routeProduct.get('/products/:id', controllerById);
routeProduct.get('/products', controllerAllProduct);


module.exports = {
  routeProduct
};
