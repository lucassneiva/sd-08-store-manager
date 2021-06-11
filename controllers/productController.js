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

const updateProduct = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  let status = OK;
  const resp = await services.update(id, { name, quantity });
  if (resp.error) {
    status = resp.status;
    next(resp);
  }
  res.status(status).send(resp);
});

const deleteProduct = rescue(async (req, res, next) => {
  const { id } = req.params;
  let status = OK;
  const resp = await services.exclude(id);
  if (resp.error) {
    status = resp.status;
    next(resp);
  }
  res.status(status).send(resp);
});

module.exports = {
  getAllProducts,
  addProduct,
  getProductbyId,
  updateProduct,
  deleteProduct,
};
