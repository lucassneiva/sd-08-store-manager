const model = require('../../models/saleModel');
const validate = require('../validation');

const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');

module.exports = async (sales) => {
  try {
    // await validate.name(sales.name);
    sales.forEach((sale) => validate.quantity(sale.quantity));

    return {
      status: HTTP.OK,
      result: await model.create({ itensSold: sales }),
    };
  } catch {
    return generateError('Wrong product ID or invalid quantity');
  }
};
