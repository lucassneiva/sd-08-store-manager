const SalesService = require('../services/salesService');

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTRY = 422;

const create = async (req, res) => {
  const salesMade = req.body;

  const { status, err, sale } = await SalesService
    .create(salesMade);

  if (status !== SUCCESS) return res.status(status).json({err});

  res.status(status).json(sale);
};

module.exports = {
  create,
};