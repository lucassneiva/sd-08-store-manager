const express = require('express');
const router = express.Router();
const ProductsModel = require('../services/productsServices');

const codeMessage = {
  code201: 201,
  code422: 422,
  code500: 500,
};

// router.get('/', async (req, res)=>{
//   try {        
//     const people = await PeopleModel.getAll();
//     return res.status(200).json(people);
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).json({message: 'Sistema temporariamente indisponível'});
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const person = await PeopleModel.getById(req.params.id);
//     if(!person) {
//       return res.status(404).json({message: 'Pessoa não encontrada'});
//     }
//     return res.status(200).json(person);
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).json({ message: 'Sistema temporariamente indisponível' });
//   }
// });

router.post('/', async (req, res) =>{
  const {name, quantity} = req.body;
  console.log(name, quantity);
  try {
    const newProducts = await ProductsModel.create(name, quantity);
    if (newProducts.code) {
      return res.status(codeMessage.code422).json({ err: newProducts});
    }
    return res.status(codeMessage.code201).json(newProducts);
      
  } catch (err) {
    console.log(err);
    return res.status(codeMessage.code500)
      .send({message:'Sistema temporariamente indisponível'});
  }
});

// router.put('/:id', async (req, res)=> {
//   const {name, age} = req.body;
//   try {
//     const people = await PeopleModel.update(req.params.id, name, age);
//     return res.status(200).json(people);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({message: 'Sistema temporariamente indisponível'});
//   }
// });

// router.delete('/:id', async(req, res) => {
//   try {
//     const people = await PeopleModel.exclude(req.params.id);
//     return res.status(200).json(people);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ message : 'Sistema temporariamente indisponível' });
//   }
// });

module.exports = router;