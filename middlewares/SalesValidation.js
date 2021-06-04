const rescue = require('express-rescue');
const { status, message, code } = require('../schema/status');

const validateQuantity = rescue((req, res, next) => {
  const itensSold = req.body;
  const minQuantity = 1;
  const items = itensSold.every((item) => {
    if (item.quantity < minQuantity) {
      return res.status(status.unprocessable)
        .json({ err: { code: code.invalidData, message: message.invalidQuantity } });
    }
    if (typeof item.quantity === 'string') {
      return res.status(status.unprocessable)
        .json({ err: { code: code.invalidData, message: message.invalidQuantity } });
    }
  });  
  next();
});

const validateId = rescue(async (req, res, next) => {
  const { id } = req.params;
  const idLength = 24;
  if (!id || id.length !== idLength) {
    return res.status(status.notFound)
      .json({ err: { code: code.notFound, message: message.saleNotFound } });
  }
  next();
});

module.exports = {
  validateQuantity,
  validateId,
};
