const { catalogProduct } = require('../services');
const {
  HTTP_CREATED_STATUS,
  HTTP_UNPROCESSABLE_ENTITY_STATUS
} = require('../config/constant/httpStatus');
const { HandleCustomerError } = require('../Middlewares/handleError');

exports.post =  async (req, res) => {
  try {
    const product = req.body;
    const response = await catalogProduct.registerProduct(product);
    res.status(HTTP_CREATED_STATUS).json(response);
  } catch (error) {
    const messageError = HandleCustomerError(error.message);
    res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json(messageError.getMessageError());
  }
};

// exports.getAll = (req, res) => {};
// exports.getById = (req, res) => {};
// exports.create = (req, res) => {};
// exports.update = (req, res) => {};
// exports.exclude = (req, res) => {};
