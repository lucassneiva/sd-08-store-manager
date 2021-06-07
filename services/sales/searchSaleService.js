const model = require('../../models/saleModel');
const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');

module.exports = async (id) => {
  try {
    return {
      status: HTTP.OK,
      result: id ? await model.getById(id) : { sales: await model.getAll() },
    };
  } catch (err) {
    return generateError('Sale not found', HTTP.NOT_FOUND);
  }
};
