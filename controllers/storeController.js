const rescue = require('express-rescue');
const StoreService = require('../services/storeService');

const responseSuccessStatus = 201;

const create = rescue(async (req, res, next) => {
  const response = await StoreService.create(req.body);
  // console.log('STORECONTROLLER', response);
  if (response.isJoi) {
    // console.log('entrou no isJoi');
    return next(response.details[0].message);
  }
  if (response.message) {
    // console.log('entrou no dominio');
    return next(response.message);
  }
  res.status(responseSuccessStatus).json(response);
  // res.status(responseSuccessStatus).send('OK');
});

module.exports = {
  create,
};