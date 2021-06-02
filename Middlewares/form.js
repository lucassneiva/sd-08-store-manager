const { productModel } = require('../models');
const { HandleCustomerError } = require('./handleError');
const { responseStatus: {
  HTTP_UNPROCESSABLE_ENTITY_STATUS
}, responseMessage: { FORM } } = require('../config/constant');

const MAX_SIZE_FIVE = 5;
const MIN_SIZE_ONE = 1;

const valid = () => ({
  name: (name) => !!(name && name.length >= MAX_SIZE_FIVE),
  quantity: (quantity) => !!(quantity && +quantity >= MIN_SIZE_ONE)
});

const verifyFieldName = (name) => {
  const isValid = valid().name(name);
  if (!isValid) throw new Error(FORM.NAME_INVALID);
};

const verifyProduct = async (name) => {
  if (await !productModel.existByName(name)) throw new Error(FORM.NAME_EXIST);
};

const verifyFieldQuantity = (quantity = '') => {
  const isValid = valid().quantity(quantity);
  if (typeof quantity !== 'number') throw new Error(
    FORM.QUANTITY_INVALID_TYPE);
  if (!isValid) throw new Error(FORM.QUANTITY_INVALID);
};

exports.verifyForm = (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    verifyFieldName(name);
    verifyFieldQuantity(quantity);
    next();
  } catch (error) {
    const messageError = new HandleCustomerError(error.message);
    res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json(messageError.getMessageError());
  }
};

exports.verifyExistProduct = async (req, res, next) => {
  const { name } = req.body;
  try {
    await verifyProduct(name);
    next();
  } catch (error) {
    const messageError = new HandleCustomerError(error.message);
    res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json(messageError.getMessageError());
  }
};
