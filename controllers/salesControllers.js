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
    res.status(code_422).json(messageError(error.message));
  }
};

const getAllSales = async (_req, res) => {
  try {
    const sale = await salesServices.getAllSales();
    res.status(code_200).json(sale);
  } catch (error) {
    res.status(code_422).json(messageError(error.message));
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getSaleById(id);
    return res.status(code_200).json(sale);
  } catch (error) {
    res.status(code_404).json(messageError_Not_found(error.message));
  }
};

const updateSale = async (req, res) => {
  try {
    const itensSold = req.body;
    const { id } = req.params;
    const sale = await salesServices.updateSale(id, itensSold);
    res.status(code_200).json(sale);
  } catch (error) {
    if (error.message === 'Sale not found') {
      res.status(code_404).json(messageError(error.message));
    }
    res.status(code_422).json(messageError(error.message));
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.deleteSale(id);
    res.status(code_200).json(sale);
  } catch (error) {
    if (error.message === 'Sale not found') {
      res.status(code_404).json(messageError(error.message));
    }
    res.status(code_422).json(messageError(error.message));
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
