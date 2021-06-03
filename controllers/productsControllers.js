const express = require('express');
const router = express.Router();
const ProductsServices = require('../services/productsServices');

const codeMessage = {
  code200: 200,
  code201: 201,
  code422: 422,
  code500: 500,
};

router.get('/', async (_req, res)=>{
  try {        
    const allProducts = await ProductsServices.getAll();
    console.log('linha 15 controllers', allProducts);
    return res.status(codeMessage.code200).json({ products: allProducts});
  } catch (err) {
    console.log(err.message);
    return res.status(codeMessage.code500)
      .json({message: 'Sistema temporariamente indisponível'});
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const filterIdProduct = await ProductsServices.getByIdService(id);
    console.log('linha 28 controllers', filterIdProduct);

    if(filterIdProduct.code) {
      console.log('entrou no if ID INCORRETO');
      return res.status(codeMessage.code422)
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
  const {name, quantity} = req.body;
  console.log(name, quantity);
  try {
    const newProducts = await ProductsServices.create(name, quantity);
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

router.put('/:id', async (req, res)=> {
  const {name, quantity} = req.body;
  console.log('linha 65 controllers', req.params.id, name, quantity );
  try {
    const productsUpdate = await ProductsServices.update(req.params.id, name, quantity);
    if (productsUpdate.code) {
      return res.status(codeMessage.code422).json({ err: productsUpdate});
    }
    return res.status(codeMessage.code200).json(productsUpdate);
  } catch (err) {
    console.log(err);
    return res.status(codeMessage.code500)
      .send({message: 'Sistema temporariamente indisponível'});
  }
});

router.delete('/:id', async(req, res) => {
  const { id } = req.params;

  const deleteProducts = await ProductsServices.exclude(id);

  console.log('linha 84 controllers', deleteProducts);

  if (deleteProducts.code) {
    return res.status(codeMessage.code422).json({ err: deleteProducts});
  }

  return res.status(codeMessage.code200).json(deleteProducts);

});

module.exports = router;