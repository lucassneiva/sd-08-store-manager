const { getOneProduct } = require('../models/ProductsModel');
const { results, generateMessage } = require('../services/ErrorMessage');
exports.salesNotNull = async (req, res, next) => {
  const minimalQuantity = 0;
  const invalid = req.body.filter(
    (item) => item.quantity <= minimalQuantity || typeof item.quantity === 'string',
  );
  if (invalid.length > minimalQuantity) {
    res.status(results.unprocessable).json(generateMessage(results.salesNotNull));
    return;
  }
  next();
};
exports.checkStock = async (req, res, next) => {
  const itensList = req.body;
  itensList.forEach(async (item) => {
    const product = await getOneProduct(item.productId);
    if (item.quantity > product.quantity) {
      res.status(results.notFound)
        .json(generateMessage(results.stockError, 'stock_problem'));
    }
  });
  next();
};
