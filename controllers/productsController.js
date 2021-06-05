const ProductsService = require('../services/productsService');

const CREATED = 201;
const UNPROCESSABLE_ENTRY = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { status, err, productCreated } = await ProductsService
    .create({name, quantity});

  if (status !== CREATED) {
    return res.status(status).json({ err });
  }

  res.status(status).json(productCreated);
};

module.exports = {
  create,
};
