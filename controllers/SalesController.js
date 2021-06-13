const SalesService = require('../services/SalesService');

const UNP_ENTITY = 422;
const SUCCESS = 200;
const NF = 404;

const addSale = async (req, res) => {

  const sale = req.body;

  const addedSale = await SalesService
    .addSale(sale);

  if (addedSale.err) {
    return res.status(UNP_ENTITY).json(addedSale);
  }

  return res.status(SUCCESS).json(addedSale);
};

const getAll = async (_req, res) => {

  const sale = await SalesService
    .getAll();

  return res.status(SUCCESS).json( { sales: sale });
};

const getAllById = async (req, res) => {
  const { id } = req.params;
  
  const sale = await SalesService
    .getAllById(id);

  if (sale.err) {
    return res.status(NF).json(sale);
  }
  
  return res.status(SUCCESS).json(sale);
};

module.exports = {
  addSale,
  getAll,
  getAllById,
};