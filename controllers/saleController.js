const SaleService = require('../services/saleService');

const OK = 200;

const create = async (req, res) => {
  try {
    const products = req.body;
  
    const sale = await SaleService.create(products);

    res.status(OK).json(sale);
  } catch (error) {
    const { code, message } = error;
    res.status(code).json(message);
  }
};

const getAll = async (_req, res) => {
  const allSales = await SaleService.getAll();

  res.status(OK).json(allSales);
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await SaleService.findById(id);
    
    res.status(OK).json(sale);
  } catch (error) {
    const { code, message } = error;
    res.status(code).json(message);
  }
};

module.exports = {
  create,
  getAll,
  findById,
};