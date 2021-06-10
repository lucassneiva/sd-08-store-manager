const express = require('express'); 
const {validateIfNameExists, 
  validateProduct} = require('../middlewares/productMiddleware');


const{
  controllerProduct,
  controllerAllProduct, 
  controllerById,
  controllerUpdate,
  controllerRemove} = require('../controllers/product');

const routeProduct = express.Router();

routeProduct.get('/products/:id', controllerById);
routeProduct.post('/products', validateIfNameExists, validateProduct,  controllerProduct);

routeProduct.put('/products/:id', validateProduct, controllerUpdate);
routeProduct.delete('/products/:id', controllerRemove);
routeProduct.get('/products', controllerAllProduct);




module.exports = {
  routeProduct
};
