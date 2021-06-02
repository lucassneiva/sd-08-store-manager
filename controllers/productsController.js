const express = require('express');
const router = express.Router();
const { ObjectID } = require('bson');
const { STATUS_200, STATUS_422, STATUS_500, STATUS_201,
  DEU_ERRO } = require('../statusCode');
const ZERO = 0;

const productsModel = require('../models/productsModel');
const { addProductValidation, nameValidation } = require('../validation');

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { error } = addProductValidation(req.body);
    const validationName = await nameValidation(name);
    const result = await productsModel.addProduct(name, quantity);

    if(error) return res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: error.details[0].message,
      }
    });

    if(validationName.length !== ZERO) return res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    });

    res.status(STATUS_201).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS_500).json({ message: DEU_ERRO });
  }
});

router.get('/', async (_req, res) => {
  try {
    const getAllProducts = await productsModel.getAllProducts();

    res.status(STATUS_200).json({
      products: getAllProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(STATUS_500).json({ message: DEU_ERRO });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const idValid = ObjectID.isValid(id);
    
    if(!idValid) return res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
    
    const result = await productsModel.findByIdProducts(id);
    res.status(STATUS_200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(STATUS_500).json({ message: DEU_ERRO });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const { error } = addProductValidation(req.body);

    if(error) return res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: error.details[0].message,
      }
    });

    const result = await productsModel.updateProducts(id, name, quantity);
    res.status(STATUS_200).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS_500).json({ message: DEU_ERRO });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsModel.deleteProducts(id);

    if(!result) return res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
    
    res.status(STATUS_200).json(result.message);
  } catch (error) {
    console.log(error);
    res.status(STATUS_500).json({ message: DEU_ERRO });
  }
});

module.exports = router;
