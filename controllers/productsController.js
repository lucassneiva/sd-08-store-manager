const ProductsService = require('../services/productsService');

const CREATED = 201;
const UNPROCESSABLE_ENTRY = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { status, err, productInserted } = await ProductsService
    .create({name, quantity});

  if (status !== CREATED) {
    return res.status(status).json({ err });
  }
  console.log(productInserted);
  res.status(status).json(productInserted);
};

module.exports = {
  create,
};
