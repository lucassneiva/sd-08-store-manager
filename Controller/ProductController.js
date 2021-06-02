const ProductService = require('../Service/ProductService');

const {StatusCodes} = require('http-status-codes');

const createProduct = async (req, res ) => {
  console.log('[PRODUCTS CONTROLLER] : CHAMOU O MÉTODO ADICIONAR UM PRODUCTS');
  try {
    const { name, quantity } = req.body;
    const result = await ProductService.createProduct(name, quantity);

    if (result.isError) return res.status(result.status).json(result);

    return res.status(StatusCodes.CREATED).json(result);

  } catch (error) {
    console.log(`[PRODUCTS CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


module.exports = { createProduct };