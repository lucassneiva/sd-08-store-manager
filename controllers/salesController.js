const salesModel = require('../models/salesModel');

const OK = 200;
const ERROR = 422;
const Notfound = 404;

const newSale = async (req, res) => {
  try {
    const sale = await salesModel.newSale(req.body);

    res.status(OK).json(sale);
  } catch (error) {
    if (error.message === 'Such amount is not permitted to sell'){
      res.status(Notfound)
        .json( { err: { code: 'stock_problem', message: error.message } } );
    } else {
      res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
    }
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

const exclude = async (req, res) => {
  try {
    const products = await salesModel.exclude(req.params.id);

    res.status(OK).json(products);
  } catch (error) {
    res.status(ERROR)
      .json( { err: { code: error.code, message: error.message } } );
  }
};

module.exports = { 
  newSale,
  getAll,
  getById,
  exclude
};
