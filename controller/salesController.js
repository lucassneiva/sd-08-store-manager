const sales = require('../services/salesService');
const {error, update, success} = require('../services/responseType');
const { checkSale } = require('../middlewares/checkSale');

const addSale = async (req, res) => {
  checkSale(req, res);
  const data = await sales.addSale(req);
  return data.err ? res.status(error).json(data): res.status(success).json(data);
};

module.exports = {
  addSale
};
