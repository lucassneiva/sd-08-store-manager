const productsService = require('../services/products');

const CREATED = 201;
const UNPROCESSABLE = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productsService.create(name, quantity);
  if (typeof product === 'string') return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: product,
    }
  });

  res.status(CREATED).json({ ...product });
};

module.exports = {
  create,
};
