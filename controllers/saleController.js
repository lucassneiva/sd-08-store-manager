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

module.exports = {
  addSales,
};
