const Sales = require('../services/Sales');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const add = async (req, res) => {
  const soldItems = req.body;

  const sales = await Sales.add(soldItems);

  if (sales.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(sales);
  }

  return res.status(OK).json(sales);
};

module.exports = { add };
