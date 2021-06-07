const model = require('../../models/productModel');
const validate = require('../validation');

const HTTP = require('../../utils/httpStatusCodes');
const SKIP_UNIQUENESS = true;

module.exports = async (id, newData) => {
  try {
    await validate.name(newData.name, SKIP_UNIQUENESS);
    validate.quantity(newData.quantity);

    return {
      status: HTTP.OK,
      result: await model.update(id, newData),
    };
  } catch (err) {
    return err;
  }
};
