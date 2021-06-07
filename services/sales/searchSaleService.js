const model = require('../../models/saleModel');
const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');

module.exports = async (id) => {
  try {
    const result = id ? await model.getById(id) : { sales: await model.getAll() };
    if ((id && !result) || (!id && !result.sales)) throw 'Sale not found';

    return {
      status: HTTP.OK,
      result,
    };
  } catch (err) {
    return generateError('Sale not found', HTTP.NOT_FOUND);
  }
};
