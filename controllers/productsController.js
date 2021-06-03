const ProductsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const productInserted = await ProductsService
    .create({name, quantity});

  if (!movie) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  res.status(200).json(productInserted);
};

module.exports = {
  create,
};
