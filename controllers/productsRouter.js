const express = require('express');
const router = express.Router();
const createProduct = require('../services/createProduct');
const readProductById = require('../services/readProductById');
const readProduct = require('../services/readProduct');
const mongodb = require('mongodb');
const HTTP_OK_STATUS = 201;
router.post('/', async (req, res, next) => {
  const {name , quantity} = req.body;
  await createProduct(name , quantity, res , next);
});
router.get('/:id', async (req, res, next)=>{
  const id = (req.params.id);
  await readProductById(id ,res,next);
});
router.get('/', async (_req, res, next)=>{
  await readProduct(_req,res,next);
});

module.exports = router;