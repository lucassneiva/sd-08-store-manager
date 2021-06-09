const express = require('express');
const router = express.Router();

const {
  alldocs,
  insertpdt,
  deleteone,
  getoneid,
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


// router.put('/:id');


router.delete('/:id', async(req, res) => {
  try {
      
    const { id } = req.query;
    const result = await  deleteone(id);
    res.status(cc).send(result);
  }catch (err) { 
    console.log(err);
    res.status(cdxxii).send({message: 'erro ao deletar o produto'});
  }
});

module.exports = router;