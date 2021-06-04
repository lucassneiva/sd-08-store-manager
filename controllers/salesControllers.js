const salesServices = require('../services/salesServices');
const { messageError, messageError_Not_found } = require('../schemas/salesSchemas');

const code_200 = 200;
const code_422 = 422;
const code_404 = 404;

const createSale = async (req, res) => {
  try {
    const itensSold = req.body;
    const newSale = await salesServices.createSale(itensSold);
    res.status(code_200).json(newSale);
  } catch (error) {
    console.log(error);
    res.status(code_422).json(messageError(error.message));
  }
};

const getAllSales = async (_req, res) => {
  try {
    const products = await salesServices.getAllSales();
    res.status(code_200).json(products);
  } catch (error) {
    console.error(error);
    res.status(code_422).json(messageError(error.message));
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getSaleById(id);
    return res.status(code_200).json(sale);
  } catch (error) {
    console.error(error.message);
    res.status(code_404).json(messageError_Not_found(error.message));
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
