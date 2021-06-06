const express = require('express'); 
const {validateIfNameExists, validateProduct} = require('../middwares/productMiddleware');


const{controllerProduct} = require('../controllers/product');

const routeProduct = express.Router();

routeProduct.post('/', validateProduct, validateIfNameExists, controllerProduct);

module.exports = {
  routeProduct
};
