const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const STATUS_OK = 200;
const STATUS_CREATE = 201;

const create = rescue (async(req, res, next) =>{
  const arrDataForUpdate = req.body;
  const result =  await salesService.create(arrDataForUpdate);

  res.status(STATUS_CREATE).json(result);
});

const getAll = rescue (async(req, res, next) => {
  const result = await salesService.getAll();
  res.status(STATUS_OK).json(result);
});

module.exports = {
  create,
  getAll
};