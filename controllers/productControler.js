const express = require('express');
const router = express.Router();
const {alldocs, insertpdt, deleteone } = require('../services/productServce');

router.get('/', async(req, res) => {  
  try {
    const produtos = await alldocs();
    res.send(produtos);
  }catch (err) {
    console.log(err);
    const st = 500;
    res.status(st).send({message: 'erro ao listar todos os produtos'});
  };
});
// router.get('/:id','');

router.post('/', async(req, res) => {
  try {
    const s = 200;  
    const { name, quantity } = req.body;
    const result = await  insertpdt(name, quantity);
    res.status(s).send(result);
  }catch 
  
  (err) {
    console.log(err);
    const st = 422;
    res.status(st).send(err);
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