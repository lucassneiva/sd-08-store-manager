const SalesService = require('../services/SalesService');

const UNP_ENTITY = 422;
const SUCCESS = 200;

const addSale = async (req, res) => {

  const sale = req.body;

  const addedSale = await SalesService
    .addSale(sale);

  if (addedSale.err) {
    return res.status(UNP_ENTITY).json(addedSale);
  }

  return res.status(SUCCESS).json(addedSale);
};

module.exports = {
  addSale,
};