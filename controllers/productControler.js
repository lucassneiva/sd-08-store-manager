const express = require('express');
const router = express.Router();
const {alldocs, insertpdt, deleteone } = require('../services/productServce');

router.get('/', async(req, res) => {  
  try {
    const s = 200;
    const produtos = await alldocs();
    res.status(s).send(produtos);
  }catch (err) {
    console.log(err);
    const st = 500;
    res.status(st).send({message: 'erro ao listar todos os produtos'});
  };
});
// router.get('/:id','');

router.post('/', async(req, res) => {
  const s = 201;  
  const st = 422;
  const { name, quantity } = req.body;
  try {
    const result = await insertpdt(name, quantity);
    res.status(s).json(result.ops[0]);
    
  }catch(err) {
    console.log(err);
    return res.status(st).send(err);
  };
});
// router.put('/:id');
router.delete('/:id', async(req, res) => {
  try {
    const s = 200;  
    const { id } = req.query;
    const result = await  deleteone(id);
    res.status(s).send(result);
  }catch (err) { 
    console.log(err);
    const st = 500;
    res.status(st).send({message: 'erro ao deletar o produto'});
  }
});

module.exports = router;