const sales = require('../services/sales');

const SUCCESS = 200;
const FAILURE = 422;

const addSales = async (req, res) => {
  const itensSold = req.body;
  const registeredSales = await sales.addSales(itensSold);
  if(registeredSales.err) return res.status(FAILURE).json({ err: registeredSales.err });
  return res.status(SUCCESS).json(registeredSales.data);
};

module.exports = {
  addSales,

};
