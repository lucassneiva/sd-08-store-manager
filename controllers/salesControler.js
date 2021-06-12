const express = require('express');

const router = express.Router();

const { newsale, decrementpdt } = require('../models/salesModel');

const{
  validasale,
} = require('../services/salesService');

const cc = 200;
const cci = 201;
const z = 0;
const cdxxii = 422;
const cdiv = 404;


router.post('/', async(req, res) => {
  const arrvenda = req.body;
  let result = validasale(arrvenda);
  if(result === 'ok') {
    decrementpdt(arrvenda);
    result = await newsale(arrvenda);
    res.status(cc).json(result);
    return;
  }
  res.status(cdxxii).json(result);
});


module.exports = router;