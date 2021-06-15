const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

const { newsale, decrementpdt } = require('../models/salesModel');

const{
  validasale, asales, getsalebyid, updates, deleteonesale
} = require('../services/salesService');

const cc = 200;
const cci = 201;
const z = 0;
const cdxxii = 422;
const cdiv = 404;


router.post('/', async(req, res) => {
  const arrvenda = (req.body);
  let result =  validasale(arrvenda);
  console.log('scontro21', result);
  if(result === 'ok') {
    await decrementpdt(arrvenda);
    result = await newsale(arrvenda);
    res.status(cc).json(result);
    return;
  }
  res.status(cdxxii).json(result);
});

router.get('/', async(req, res) => {  
  try {
 
    const sales = await asales();
    console.log('control35', sales);
    res.status(cc).send(sales);
    return;
  }catch (err) {
    console.log('sconrol39',err);
    res.status(cdxxii).send(err);
    return;  
  };
});


router.get('/:id', async(req, res) => {  
  const { id } = req.params;
  try {
 
    const sales = await getsalebyid(id);
    // console.log('controler:50', id);
    res.status(cc).send(sales);
    return;
  }catch (err) {
    // console.log('aqui',err);
    res.status(cdiv).send(err);
    return;  
  };
});

router.put('/:id', async(req, res) => {  
  const { id } = req.params;
  const  body = req.body;
  
  const updated = await updates(id,body);
  //console.log('put', updated);
  let dinamics = updated ? cdxxii: cc;
  res.status(dinamics).send(updated);
  return;
  
});


router.delete('/:id', async(req, res) => {  
  const { id } = req.params;
   
  const deleted = await deleteonesale(id);
  // console.log('controler:77', deleted);
  if(deleted.error === cdiv){ res.status(cdiv).send(deleted);return;
  }else{  let dinamics = deleted !== null ? cc : cdxxii;
    res.status(dinamics).send(deleted);
    return;}
  
});



module.exports = router;