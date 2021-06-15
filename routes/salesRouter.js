const express = require('express');
const middlewares = require('../middlewares');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.post(
  '/',
  middlewares.quantityValidationInArray,
  salesController.create,
);

module.exports = router;
