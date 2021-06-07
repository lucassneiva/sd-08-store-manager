const model = require('../../models/saleModel');
const productModel = require('../../models/productModel');
const validate = require('../validation');

const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');
const updateOrigin = require('../../utils/updateOrigin');

module.exports = async (sales) => {
  try {
    sales.forEach((sale) => validate.quantity(sale.quantity));

    await updateOrigin(sales, productModel, 'subtract');

    return {
      status: HTTP.OK,
      result: await model.create({ itensSold: sales }),
    };
  } catch (err) {
    if (err.status === HTTP.NOT_FOUND) {
      return generateError(
        'Such amount is not permitted to sell',
        HTTP.NOT_FOUND,
        'stock_problem',
      );
    }

    return generateError('Wrong product ID or invalid quantity');
  }
};
