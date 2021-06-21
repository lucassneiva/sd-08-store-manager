const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const productModel = require('../models/productModel');
const {productNameCheck, productQuatityCheck, 
  productUpdateCheck} = require('../services/productService');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_ERROR_CLIENT = 422;
const STATUS_ERROR_SERVER = 500;

//Req01
router.post('/', productNameCheck, productQuatityCheck, async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newProduct = await productModel.add(name, quantity);
    res.status(STATUS_CREATED).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(STATUS_ERROR_SERVER).send({mesage: 'Sistema Indisponível'});
  }
});

// Req02
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getById(id);
    // console.log(product);
    if(!product) {
      res.status(STATUS_ERROR_CLIENT).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      });
    }
    res.status(STATUS_OK).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(STATUS_ERROR_SERVER).send({message: 'Sistema Indisponível'});
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await productModel.getAll();
    console.log(products);
    res.status(STATUS_OK).json({ products });
  } catch (error) {
    console.log(error.message);
    res.status(STATUS_ERROR_SERVER).send({message: 'Sistema Indisponível'});
  }
});

// Req03
router.put('/:id', productUpdateCheck, productQuatityCheck, async(req, res) => {
  try {
    const productForUpdate = req.body;
    const { id } = req.params;
    const productUpdated = await productUpdatedModel.update(id, productForUpdate);
    // console.log(product);
    res.status(STATUS_OK).json(productUpdated);
  } catch (error) {
    console.log(error.message);
    res.status(STATUS_ERROR_SERVER).send({message: 'Sistema Indisponível'});
  }
});

//Req04
router.delete('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    // const product = await productModel.getById(id);
    // if(!product) {
    //   res.status(STATUS_ERROR_CLIENT).json({
    //     err: {
    //       code: 'invalid_data',
    //       message: 'Wrong id format'
    //     }
    //   });
    // }
    const productRemoved = await productModel.remove(id);
    console.log(product);
    res.status(STATUS_OK).json(productRemoved);
  } catch (error) {
    console.log(error.message);
    res.status(STATUS_ERROR_SERVER).send({message: 'Sistema Indisponível'});
  }
});

module.exports = router;