const express = require('express');
const router = express.Router();
const { ObjectID } = require('bson');

const productsModel = require('../models/productsModel');
const { addProductValidation, nameValidation } = require('../validation');

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { error } = addProductValidation(req.body);
    const validationName = await nameValidation(name);
    const result = await productsModel.addProduct(name, quantity);

    if(error) return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: error.details[0].message,
      }
    });

    if(validationName.length !== 0) return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const getAllProducts = await productsModel.getAllProducts();

    res.status(200).json({
      products: getAllProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const idValid = ObjectID.isValid(id);
    
    if(!idValid) return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
    
    const result = await productsModel.findByIdProducts(id);
    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const { error } = addProductValidation(req.body);

    if(error) return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: error.details[0].message,
      }
    });

    const result = await productsModel.updateProducts(id, name, quantity);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
