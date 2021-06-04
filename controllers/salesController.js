const { salesServices } = require('../services/');
const {
  createSales,
  readSales,
  readSalesById,
  updateSalesById,
  deleteSalesById,
} = salesServices;

const UNPROCESSABLE = 422;
const NOT_FOUND = 404;
const STOCK_PROBLEM = 'stock_problem';
const CODE_INVALID = 'invalid_data';
const SUCESS = 200;

const salesCreate = async (req, res) => {
  try {
    const itensSold = req.body;
    const result = await createSales(itensSold);
    if (result.err) {
      return res.status(UNPROCESSABLE).json(result);
    }
    return res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

const salesReader = async (_req, res) => {
  try {
    const result = await readSales();
    res.status(SUCESS).json({
      sales: result,
    });
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

const salesReaderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await readSalesById(id);
    if (result.err.code === 'not_found') {
      return res.status(NOT_FOUND).json(result);
    }
    return res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

const salesUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;
    const result = await updateSalesById(id, itensSold);
    if (result.err) {
      return res.status(UNPROCESSABLE).json(result);
    }
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

const salesDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteSalesById(id);
    if (result.err) {
      return res.status(UNPROCESSABLE).json(result);
    }
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  salesCreate,
  salesReader,
  salesReaderById,
  salesUpdate,
  salesDelete,
};