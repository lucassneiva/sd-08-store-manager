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

module.exports = {
  create,
};