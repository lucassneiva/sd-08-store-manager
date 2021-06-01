const salesModel = require('../models/salesModel');

const OK = 200;
const ERROR = 422;
const Notfound = 404;

const newSale = async (req, res) => {
  try {
    const sale = await salesModel.newSale(req.body);

    res.status(OK).json(sale);
  } catch (error) {
    res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
  }
};

const getAll = async (_req, res) => {
  const sales = await salesModel.getAll();

  res.status(OK).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await salesModel.getById(id);

    if (!product){
      return res.status(Notfound)
        .json({ err: { code: 'not_found', message: 'Sale not found' } });
    }

    res.status(OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { 
  newSale,
  getAll,
  getById,
};
