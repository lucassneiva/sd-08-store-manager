const salesServices = require('../services/salesServices');
const { messageError } = require('../schemas/salesSchemas');

const code_200 = 200;
const code_422 = 422;

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
    res.status(code_422).json('Deu ruim');
    // res.status(code_422).json(messageError(error.message));
  }
};

module.exports = {
  createSale,
  getAllSales,
};
