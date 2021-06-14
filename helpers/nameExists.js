const Products = require('../models/productsModels');

const nameExists = async (name) => {
  const allProducts = await Products.getAllProducts();
  const findProduct = await allProducts.find((product) => product.name === name);
  if (findProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  }
  return 'Validated';
};

module.exports = nameExists;
