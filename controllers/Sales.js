const express = require('express');
const services = require('../services/Sales');

const { status } = require('../schema/status');
const { validateQuantity, validateId } = require('../middlewares/SalesValidation');

const routes = express.Router();

routes.post('/', validateQuantity, async (req, res) => {
  const itensSold = req.body;
  const registerSale = await services.register(itensSold);
  return res.status(status.OK).json(registerSale);
});

routes.get('/', async (req, res) => {
  const soldProducts = await services.findAll();
  return res.status(status.OK).json(soldProducts);
});

routes.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const soldProducts = await services.findById(id);
  if (!soldProducts) {
    return res.status(status.notFound)
      .json({ err: { code: code.notFound, message: message.saleNotFound } });
  }
  return res.status(status.OK).json(soldProducts);
});

module.exports = routes;
