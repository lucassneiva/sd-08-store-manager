const SalesService = require('../services/SalesService');

const STATUS_OK = '200';

const getAllSales = async(_request, response) => {
  try {
    const sales = await SalesService.getAll();
    response.status(STATUS_OK).json({ sales });
  } catch (err) {
    throw new error(err);  
  }
};

const registerSale = async(request, response) => {
  const sale = request.body;

  const sales = await SalesService.register(sale);
  
  response.status(STATUS_OK).json(sales);
};


module.exports = {
  getAllSales,
  registerSale,
};
