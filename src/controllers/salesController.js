const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const HTTP_OK = 200;

const getAll = rescue(async (req, res) => {
  const sales = await salesService.getAll();

  res.status(HTTP_OK).json(sales);
});

const getById = rescue(async (req, res, next)=>{
  const {id} = req.body;

  const resultId =await salesService.getById(id);

  if (resultId.error) return next(resultId);
  res.status(HTTP_OK).json(resultId);

});

const create = rescue(async (req, res, next) => {
  const items = req.body;

  const newSale = await salesService.create(items);

  if (newSale.error) return next(newSale);

  res.status(HTTP_OK).json(newSale);
});

const update = rescue(async (req, res, next)=>{
  const items = req.body;
  const { id } = req.params;

  const resultUpdate = await salesService.update(id, items);
  if (resultUpdate.error) return next(resultUpdate);
  res.status(HTTP_OK).json(resultUpdate);
});

module.exports = {
  getAll,
  create,
  getById,
  update,
};