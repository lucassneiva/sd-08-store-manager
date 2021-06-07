const express = require('express');
const router = express.Router();
const SalesServices = require('../services/salesServices');

const codeMessage = {
  code200: 200,
  code201: 201,
  code404: 404,
  code422: 422,
  code500: 500,
};

router.get('/', async (_req, res)=>{
  try {        
    const allProducts = await SalesServices.getAll();
    console.log('linha 15 controllers', allProducts);
    return res.status(codeMessage.code200).json({ sales: allProducts});
  } catch (err) {
    console.log(err.message);
    return res.status(codeMessage.code500)
      .json({message: 'Sistema temporariamente indisponível'});
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const filterIdProduct = await SalesServices.getByIdService(id);
    console.log('linha 28 controllers', filterIdProduct);

    if(filterIdProduct.code) {
      console.log('entrou no if ID INCORRETO');
      return res.status(codeMessage.code404)
        .json({err: filterIdProduct});
    };

    console.log('ID CORRETO');
    return res.status(codeMessage.code200).json(filterIdProduct);

  } catch (err) {
    console.log('caiu no catch', err);
    return res.status(codeMessage.code500)
      .json({ message: 'Sistema temporariamente indisponível' });
  }
});

router.post('/', async (req, res) =>{
  const idCheckOut = req.body;
  console.log('linha 48 salescontrollers', idCheckOut);
  try {
    const newProducts = await SalesServices.create(idCheckOut);
    console.log('linha 51 salescontrollers',newProducts);
    if (newProducts.code) {
      return res.status(codeMessage.code422).json({ err: newProducts});
    }
    return res.status(codeMessage.code200).json(newProducts);
      
  } catch (err) {
    console.log(err);
    return res.status(codeMessage.code500)
      .send({message:'Sistema temporariamente indisponível'});
  }
});

// router.put('/:id', async (req, res)=> {
//   const {name, quantity} = req.body;
//   console.log('linha 65 controllers', req.params.id, name, quantity );
//   try {
//     const productsUpdate = await SalesServices.update(req.params.id, name, quantity);
//     if (productsUpdate.code) {
//       return res.status(codeMessage.code422).json({ err: productsUpdate});
//     }
//     return res.status(codeMessage.code200).json(productsUpdate);
//   } catch (err) {
//     console.log(err);
//     return res.status(codeMessage.code500)
//       .send({message: 'Sistema temporariamente indisponível'});
//   }
// });

// router.delete('/:id', async(req, res) => {
//   const { id } = req.params;

//   const deleteProducts = await SalesServices.exclude(id);

//   console.log('linha 84 controllers', deleteProducts);

//   if (deleteProducts.code) {
//     return res.status(codeMessage.code422).json({ err: deleteProducts});
//   }

//   return res.status(codeMessage.code200).json(deleteProducts);

// });

module.exports = router;