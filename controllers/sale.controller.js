const { salesProcessService } = require('../services');
const { saleModel } = require('../models');
const {
  HTTP_UNPROCESSABLE_ENTITY_STATUS,
  HTTP_OK_STATUS,
  HTTP_NOT_FOND_STATUS
} = require('../config/constant/httpStatus');
const { HandleCustomerError } = require('../Middlewares/handleError');
const { RESPONSE } = require('../config/constant/returnMessage');

exports.getAll =  async (_req, res) => {
  try {
    const response = await saleModel.getAll();
    res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    const messageError = new HandleCustomerError(error.message);
    res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json(messageError.getMessageError());
  }
};

exports.getById =  async (req, res) => {
  try {
    const { id } = req.params;
    const response = await salesProcessService.findSaleById(id);
    res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    const messageError = new HandleCustomerError(error.message, 'not_found');
    res.status(HTTP_NOT_FOND_STATUS).json(messageError.getMessageError());
  }
};

exports.post =  async (req, res) => {
  try {
    const  sale  = req.body;
    const response = await salesProcessService.registerSale(sale);
    res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    const messageError = new HandleCustomerError(error.message);
    res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json(messageError.getMessageError());
  }
};

exports.put =  async (req, res) => {
  try {
    const  { id }  = req.params;
    const  sale  = req.body;
    const response = await salesProcessService.changeSale(id, sale);
    res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    const code = error.message === RESPONSE.SALE_NOT_FOUND
      ? HTTP_NOT_FOND_STATUS
      : HTTP_UNPROCESSABLE_ENTITY_STATUS;
    const messageError = new HandleCustomerError(error.message);
    res.status(code).json(messageError.getMessageError());
  }
};

exports.delete =  async (req, res) => {
  try {
    const  { id }  = req.params;
    const response = await salesProcessService.purgeSale(id);
    res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    const code = error.message === RESPONSE.SALE_NOT_FOUND
      ? HTTP_NOT_FOND_STATUS
      : HTTP_UNPROCESSABLE_ENTITY_STATUS;
    const messageError = new HandleCustomerError(error.message);
    res.status(code).json(messageError.getMessageError());
  }
};
