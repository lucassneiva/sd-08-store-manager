const service = require('../services/products');

const CREATED = 201;

const createProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, result } = await service.create({ name, quantity });
  res.status(status).json(result);
};

module.exports ={
  createProducts,
};