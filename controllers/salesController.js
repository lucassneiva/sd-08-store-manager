const { salesServices } = require('../services/');
const {
  createSales,
} = salesServices;

// const CREATED = 201;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;
const STOCK_PROBLEM = 'stock_problem';
const SUCESS = 200;

const salesCreate = async (req, res) => {
  try {
    const itensSold = req.body;
    // console.log(itensSold);
    const result = await createSales(itensSold);
    console.log(result);
    if (result.err) {
      // if (result.err.code === STOCK_PROBLEM) {
      //   return res.status(NOT_FOUND).json(result);
      // }
      return res.status(UNPROCESSABLE).json(result);
    }
    return res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  salesCreate,
};