const model = require('../../models/saleModel');
const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');

module.exports = async (id) => {
  try {
    return {
      status: HTTP.OK,
      result: await model.remove(id),
    };
  } catch (err) {
    return generateError('Wrong sale ID format');
  }
};
