const rescue = require('express-rescue');
const StoreService = require('../services/storeService');

const responseSuccessStatus = 201;

const create = rescue(async (req, res, next) => {
  const response = await StoreService.create(req.body);
  if (response.isJoi) return next(response.details[0].message);
  if (response.message) return next(response.message);
  res.status(responseSuccessStatus).json(response);
});

module.exports = {
  create,
};