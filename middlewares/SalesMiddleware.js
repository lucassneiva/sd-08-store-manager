const SalesService = require('../services/SalesService');

const STATUS_OK = '200';
const STATUS_ERROR = '404';

const getAllSales = async(_request, response) => {
  try {
    const sales = await SalesService.getAll();
    console.log(sales);
    response.status(STATUS_OK).json({ sales });
  } catch (err) {
    throw new error(err);
  }
};

const findByIdSale = async(request, response) => {
  const { id } = request.params;
  const ID_LENGTH = 24;

  if(id.length < ID_LENGTH) return response.status(STATUS_ERROR).json({
    err: { code: 'not_found', message: 'Sale not found'}
  });

  const sale = await SalesService.findById(id);

  response.status(STATUS_OK).json(sale);
}; 

const registerSale = async(request, response) => {
  const sale = request.body;

  const sales = await SalesService.register(sale);
  
  response.status(STATUS_OK).json(sales);
};

const updateSale = async(request, response) => {
  const { id } = request.params;
  const { productId, quantity } = request.body[0];

  const sales = await SalesService.update(id, productId, quantity);

  response.status(STATUS_OK).json(sales);
};

module.exports = {
  getAllSales,
  findByIdSale,
  registerSale,
  updateSale,
};
