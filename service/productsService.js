const express = require('express');
const bodyParser = require('body-parser');
const {
  UNPROCESSABE_ENTITY,
  CREATED,
  OK,
  ID_LENGTH
} = require('../service/consts');
const {
  validLength,
  validAmount
} = require('./jokerValidations');
const {
  existProduct,
  addProduct,
  updateProduct,
} = require('../models/productsModel');

const app = express();
app.use(bodyParser.json());


const validation = (body) => {
  const quantity = validAmount(body.quantity);
  if (!validLength(body['name'])) {
    throw {
      status: UNPROCESSABE_ENTITY,
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    };
  } if (quantity === 'IsNaN' ) {
    throw {
      status: UNPROCESSABE_ENTITY,
      code: 'invalid_data',
      message: '"quantity" must be a number'
    };
  } if (quantity === 'IsLessOrEqual0') {
    throw {
      status: UNPROCESSABE_ENTITY,
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    };
  }
};

// 1 - Crie um endpoint para o cadastro de produtos
const tryAddProduct = async (req, res) => {
  const { body } = req;
  try {
    await existProduct(body.name);
    validation(body);
    const productAdded = await addProduct(body);
    return res.status(CREATED).json(productAdded);
  } catch (error) {
    return res.status(error.status).json({err: {
      code: error.code,
      message: error.message
    }});
  }
};

// 3 - Crie um endpoint para atualizar um produto

const tryUpdate = async (req, res) => {
  const { body, params } = req;
  try {
    validation(body);
    const isFound = await updateProduct(body, params);  
    return res.status(OK).json(isFound);
  } catch (error) {
    return res.status(error.status).json({err: {
      code: error.code,
      message: error.message
    }});
  }
};

module.exports = {
  tryAddProduct,
  tryUpdate
};