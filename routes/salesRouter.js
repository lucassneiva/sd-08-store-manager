const express = require('express');
const middlewares = require('../middlewares');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.post(
  '/',
  //async (req, res, next) => await middlewares.idValidationInArray(req, res, next),
  middlewares.idValidationInArray,
  middlewares.quantityValidationInArray,
  salesController.create,
);

module.exports = router;
