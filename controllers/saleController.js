const services = require('../services/salesServices');
const rescue = require('express-rescue');

const OK = 200;
// const CREATED = 201;

const addSales = rescue(async (req, res, next) => {
  let status = OK;
  const resp = await services.create(req.body);
  if (resp.error) {
    status = resp.status;
    next(resp);
  }
  res.status(status).json(resp);
});

const getAllSales = rescue(async (_req, res, _next) => {
  const resp = await services.getAll();
  res.status(OK).json({ sales: resp });
});

const getSaleById = rescue(async (req, res, next) => {
  const { id } = req.params;
  let status = OK;
  const resp = await services.getById(id);
  if (resp.error) {
    status = resp.status;
    next(resp);
  }
  res.status(status).send(resp);
});

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
};
