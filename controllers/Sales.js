const rescue = require('express-rescue');
const service = require('../services/Sales');
const salesSchema = require('../schemas/SalesSchema');

const OK = 200;

const create = rescue(async (req, res, next) => {
  const { error } = salesSchema.validate(req.body);

  if (error) return next(error);

  const itensSold = await service.create(req.body);

  if (itensSold.error) return next(itensSold.error);

  res.status(OK).json(itensSold);
});

const findAll = rescue(async (_, res, next) => {
  const sales = await service.findAll();

  if (sales.error) return next(sales.error);

  res.status(OK).json({ sales });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await service.findById(id);

  if (sale.error) return next(sale.error);

  res.status(OK).json(sale);

});

const update = rescue(async (req, res, next) => {
  const { error } = salesSchema.validate(req.body);

  if (error) return next(error);

  const { id } = req.params;
  const { body: itensSold } = req;

  const sale = await service.update({ id, itensSold });

  if (sale.error) return next(sale.error);

  res.status(OK).json(sale);
});

const remove = rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await service.remove(id);

  if (sale?.error) return next(sale.error);

  res.status(OK).json({ message: 'ok' });
});

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};