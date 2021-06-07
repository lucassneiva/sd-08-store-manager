const generateError = require('./generateError');
const HTTP = require('./httpStatusCodes');

const subtractLoop = async (items, originModel) => {
  for (const item of items) {
    await originModel.getById(item.productId).then((product) => {
      if (item.quantity > product.quantity) {
        throw { status: HTTP.NOT_FOUND };
      }

      originModel.update(item.productId, {
        name: product.name,
        quantity: product.quantity - item.quantity,
      });
    });
  }
};

const sumLoop = async (items, originModel) => {
  for (const item of items) {
    await originModel.getById(item.productId).then((product) => {
      originModel.update(item.productId, {
        name: product.name,
        quantity: product.quantity + item.quantity,
      });
    });
  }
};

module.exports = async (items, originModel, operation) => {
  if (operation === 'subtract') await subtractLoop(items, originModel);
  if (operation === 'sum') await sumLoop(items, originModel);
};
