const productsModel = require('../models/productsModel');

module.exports = async (products, operation) => {
  const err = {
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    }
  };
  try {
    for (let index = 1; index <= products.length; index += 1) {
      const id = products[index - 1].productId;
      const quant = operation * products[index - 1].quantity;

      const { quantity } = await productsModel.findProduct(id);
      if (Math.abs(quant) > quantity) {
        return err;
      }
      await productsModel.updateProduct(id, products[index - 1], 'inc', quant);
    }
    return null;
  } catch { }
};
