const model = require('../../models/saleModel');
const validate = require('../validation');

const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');

module.exports = async (id, newData) => {
  try {
    validate.quantity(newData[0].quantity);

    return {
      status: HTTP.OK,
      result: await model.update(id, newData[0]),
    };
  } catch (err) {
    return generateError('Wrong product ID or invalid quantity');
  }
};
