const express = require('express');
const router = express.Router();

const { validateSale } = require('../schema/SaleSchema');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;
const ERROR = 500;
const message = 'There is something wrong';

router.post('/', validateSale, async (req, res) => {
  
});

module.exports = router;
