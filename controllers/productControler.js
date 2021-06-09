const express = require('express');
const router = express.Router();

const {
  alldocs,
  insertpdt,
  deleteone,
  getoneid,
  updateOne,
} = require('../services/productServce');
const cc = 200;
const cci = 201;
const z = 0;
const cdxxii = 422;
const cdiv = 404;


router.get('/', async(req, res) => {  
  try {
 
    const products = await alldocs();
    res.status(cc).send(products);
 
  }catch (err) {
 
    console.log(err);
    res.status(cdxxii).send(err);
 
  };
});


router.get('/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const result = await getoneid(id);
    console.log(result);
    res.status(cc).send(result);
  }catch (err) {
    console.log(err);
    res.status(cdxxii).send(err);
  };
});


router.post('/', async(req, res) => {
  
  const { name, quantity } = req.body;
  
  try {
  
    const result = await insertpdt(name, quantity);
    res.status(cci).json(result.ops[z]);
  
  }catch(err) {
    console.log(err);
    return res.status(cdxxii).send(err);
  };
});


router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const  body = req.body;
  // console.log('olha ai:', body);
  try {
    const result = await updateOne(id, body);
    res.status(cc).json(result);
  }catch (err) {
    console.log(err);
    res.status(cdxxii).send(err);
  };
});


router.delete('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const result = await  deleteone(id);
    res.status(cc).send(result);
  }catch (err) { 
    console.log(err);
    res.status(cdxxii).send(err);
  }
});

module.exports = router;