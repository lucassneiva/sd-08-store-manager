const ProductsService = require('../services/products');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductsService
    .create({ name, quantity });
  
  if(!product){
    
  }
};