const express = require('express');

const router = express.Router();

const { newsale, decrementpdt } = require('../models/salesModel');

const{
  validasale, asales, getsalebyid, updates,
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

router.get('/', async(req, res) => {  
  try {
 
    const sales = await asales();
    // console.log('get', sales);
    res.status(cc).send(sales);
    return;
  }catch (err) {
    console.log(err);
    res.status(cdxxii).send(err);
    return;  
  };
});


router.get('/:id', async(req, res) => {  
  
  try {
 
    const sales = await getsalebyid(req.params.id);
    // console.log('get', sales);
    res.status(cc).send(sales);
    return;
  }catch (err) {
    console.log(err);
    res.status(cdxxii).send(err);
    return;  
  };
});

router.put('/:id', async(req, res) => {  
  const { id } = req.params;
  const  body = req.body;
 
  const updated = await updates(id,body);
  // console.log('get', sales);
  res.status(cc).send(updated);
  return;
  
});


module.exports = router;