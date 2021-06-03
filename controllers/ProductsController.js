const ProductsService = require('../services/ProductsService');

const UNPROCESSABLE_ENTITY = 422;
const CREATED = 201;

const addProducts = async (req, res) => {
  const newProduct = req.body;
  
  const product = await ProductsService.addProduct(newProduct);
  
  if(product.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(product);
  }
  
  return res.status(CREATED).json(product);
};

module.exports = {
  addProducts
};
