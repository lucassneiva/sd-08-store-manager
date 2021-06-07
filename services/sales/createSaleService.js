const model = require('../../models/saleModel');
const productModel = require('../../models/productModel');
const validate = require('../validation');

const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');
const updateOrigin = require('../../utils/updateOrigin');

module.exports = async (sales) => {
  try {
    sales.forEach((sale) => validate.quantity(sale.quantity));

    updateOrigin(sales, productModel, 'subtract');

    return {
      status: HTTP.OK,
      result: await model.create({ itensSold: sales }),
    };
  } catch {
    return generateError('Wrong product ID or invalid quantity');
  }
};
