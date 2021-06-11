const services = require('../services/productServices');
const rescue = require('express-rescue');

const OK = 200;
const CREATED = 201;

const getAllProducts = rescue(async (_req, res) => {
  const resp = await services.getAll();
  res.status(OK).send(resp);
});

const addProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const resp = await services.create({ name, quantity });
  if (resp.error) {
    next(resp);
  }

  const status = resp.status ? resp.status : CREATED;
  res.status(status).send(resp);
});

module.exports = { getAllProducts, addProduct };
