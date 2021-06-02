const SalesServices = require('../services/Sales');

const create = async (req, res) => {
  const result = await SalesServices.create(req.body);
  res.json(result);
};

module.exports = {
  create
};
