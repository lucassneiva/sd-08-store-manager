const Products = require('../models/Products');
const { status, message, code } = require('../schemas/status');

const create = async (name, quantity) => {
  const existingProduct = await Products.findByName(name);

  if (existingProduct) {
    return {
      isError: true,
      status: status.unprocessable,
      code: code.invalidData,
      message: message.productExists,
    };
  };
  const createdProduct = await Products.create(name, quantity);
  return createdProduct;
};

module.exports = {
  create,
};
