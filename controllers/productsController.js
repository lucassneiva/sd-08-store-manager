const express = require('express');
const router = express.Router();

const productsServices = require('../services/productsService');
const productsModel = require('../models/productsModel');

const OK = 200;
const CREATED = 201;
const ERR = 500;
const UNPROCESSABLE_ENTITY = 422;

router.post('/', productsServices.validateProducts, async(req, res) => {
  try {
    const {name, quantity} = req.body;
    const product = await productsModel.Add(name, quantity);
    res.status(CREATED).json(product.ops[0]);

  } catch (error) {
    res.status(ERR).json('error');
  }
});

router.get('/', async(_req, res) => {
  try {
    const allProducts = await productsModel.getAll();
    console.log(allProducts);
    res.status(OK).json({ products: allProducts });
  } catch (error) {
    res.status(ERR).json(error);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const findProduct = await productsModel.getAllById(id);
    console.log(findProduct);

    if(!findProduct){
      return res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    return res.status(OK).json(findProduct);
  } catch (error) {
    res.status(ERR).json(error);
  }
});


module.exports = router;
