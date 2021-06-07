const model = require('../../models/productModel');
const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');

module.exports = async (id) => {
  try {
    return {
      status: HTTP.OK,
      result: await model.remove(id),
    };
  } catch (err) {
    return generateError('Wrong id format');
  }
};
