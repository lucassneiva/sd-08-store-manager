const services = require('../services/productServices');
const rescue = require('express-rescue');

const OK = 200;
const CREATED = 201;

const getAllProducts = rescue(async (_req, res) => {
  const resp = await services.getAll();
  res.status(OK).json({ products: resp });
});

const getProductbyId = rescue(async(req, res, next) => {
  const { id } = req.params;
  let status = CREATED;
  const resp = await services.getById(id);
  if (resp.error) {
    status = resp.status;
    next(resp);
  }
  res.status(OK).send(resp);
});

const addProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  let status = CREATED;
  const resp = await services.create({ name, quantity });
  if (resp.error) {
    status = resp.status;
    next(resp);
  }
  res.status(status).json(resp);
});

module.exports = {
  getAllProducts,
  addProduct,
  getProductbyId,
};
