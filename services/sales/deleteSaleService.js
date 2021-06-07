const model = require('../../models/saleModel');
const productModel = require('../../models/productModel');

const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');
const updateOrigin = require('../../utils/updateOrigin');

module.exports = async (id) => {
  try {
    const deletedItems = await model.getById(id).then((item) => item.itensSold);

    await updateOrigin(deletedItems, productModel, 'sum');

    return {
      status: HTTP.OK,
      result: await model.remove(id),
    };
  } catch (err) {
    return generateError('Wrong sale ID format');
  }
};
