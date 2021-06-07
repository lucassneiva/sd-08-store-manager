const {
  isValid,
  messageError,
  message_quantityError
} = require('../schemas/salesSchemas');
const productsModel = require('../models/productModel');

const code_422 = 422;
const code_404 = 404;

const validateSale = (req, res, next) => {
  try {
    const itensSold = req.body;
    isValid(itensSold[0].quantity);
    next();
  } catch (error) {
    const message = messageError(error.message);
    res.status(code_422).json(message);
  }
};

// validação do requisito 10 => não funciona ainda
const checkQuantity = async (req, res, next) => {
  const itensSold = req.body;
  itensSold.forEach(async (sale) => {
    const product = await productsModel.getProductById(sale.productId);
    if (sale.quantity > product.quantity) {
      res.status(code_404).json(message_quantityError(error.message));
    }
  });
  next();
};

module.exports = {
  validateSale,
  checkQuantity,
};
