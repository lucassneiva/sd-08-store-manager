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

const updateSaleByID = async (req, resp) => {
  const { id } = req.params;
  const { quantity, productId } = req.body[0];

  const updateSale = await SalesService.updateSaleByID(id, quantity, productId);

  if(updateSale.code) return resp.status(updateSale.code).json(updateSale.message);


  resp.status(HTTP_STATUS_OK).json(updateSale);
};

const deleteSaleByID = async (req, resp) => {
  const { id } = req.params;
  const response = await SalesService.deleteSaleByID(id);

  if(response.code) return resp.status(response.code).json(response.message);

  resp.status(HTTP_STATUS_OK).json(response);
};


module.exports = {
  registerSale,
  getAllSales,
  getSalesByID,
  updateSaleByID,
  deleteSaleByID
};
