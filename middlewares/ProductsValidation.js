const rescue = require('express-rescue');
const { status, message, code } = require('../schema/status');

const validateName = rescue((req, res, next) => {
  const { name } = req.body;
  const minNameLength = 5;
  if (name.length < minNameLength) {
    return res.status(status.unprocessable)
      .json({ err: { code: code.invalidData, message: message.nameLength } });
  }
  next();
});

const validateQuantity = rescue((req, res, next) => {
  const { quantity } = req.body;
  const minQuantity = 1;
  if (quantity < minQuantity) {
    return res.status(status.unprocessable)
      .json({ err: { code: code.invalidData, message: message.quanitityLength } });
  }
  if (typeof quantity === 'string') {
    return res.status(status.unprocessable)
      .json({ err: { code: code.invalidData, message: message.quantityType } });
  }
  next();
});

const validateId = rescue((req, res, next) => {
  const { id } = req.params;
  const idLength = 24;
  if (!id || id.length !== idLength) {
    return res.status(status.unprocessable)
      .json({ err: { code: code.invalidData, message: message.wrongIdFormat } });
  }
  next();
});

module.exports = {
  validateName,
  validateQuantity,
  validateId,
};
