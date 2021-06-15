const Products = require('../models/productsModels');
const { ObjectId } = require('mongodb');

const ZERO = 0;

const saleValidation = async (sales) => {
  const allProducts = await Products.getAllProducts();
  const allProductsId = await allProducts.map((product) => {
    ObjectId(product['_id']);
  });

  const verifyIdExists = sales.every(({ productId }) => {
    allProductsId.includes(productId);
  });

  if (sales.quantity <= ZERO || !Number.isInteger(sales.quantity) || !verifyIdExists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return 'validated';
};

module.exports = saleValidation;
