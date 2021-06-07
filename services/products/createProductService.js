const model = require('../../models/productModel');
const validate = require('../validation');

const HTTP = require('../../utils/httpStatusCodes');

module.exports = async (product) => {
  try {
    await validate.name(product.name);
    validate.quantity(product.quantity);

    return {
      status: HTTP.CREATED,
      result: await model.create(product),
    };
  } catch (err) {
    return err;
  }
};
