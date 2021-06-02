const express = require('express');
const router = express.Router();
const createProduct = require('../services/createProduct');
const HTTP_OK_STATUS = 201;
router.post('/', async (req, res, next) => {
  console.log('post');
  console.table(req.body);
  const result = await createProduct(req, res , next);
  res.status(HTTP_OK_STATUS).json(talkers);
  next();
});

module.exports = router;