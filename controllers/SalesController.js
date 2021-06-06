const SalesService = require('../services/SalesService');

const HTTP_STATUS_OK = 200;

const registerSale = async (req, resp) => {
  const sale = req.body;

  const response = await SalesService.registerSale(sale);
  if(response.code) return resp.status(response.code).json(response.message);

  resp.status(HTTP_STATUS_OK).json(response);
};

const getAllSales = async (req, resp) => {
  const allSales = await SalesService.getAllSales();
  resp.status(HTTP_STATUS_OK).send(allSales);
};

const getSalesByID = async (req, resp) => {
  const { id } = req.params;

  const saleId = await SalesService.getSalesByID(id);
  if(saleId.code) return resp.status(saleId.code).json(saleId.message);

  resp.status(HTTP_STATUS_OK).send(saleId);
};


module.exports = {
  registerSale,
  getAllSales,
  getSalesByID
};
