const express = require('express');
const connection = require('../models/connection');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const {
  UNPROCESSABE_ENTITY,
  CREATED,
  OK,
  ID_LENGTH
} = require('../service/consts');
const rescue = require('express-rescue');
const {
  validLength,
  validAmount
} = require('../service/jokerValidations');
const { tryAddProduct } = require('../service/productsService');

const router = express.Router();
const app = express();
app.use(bodyParser.json());

// 1 - Crie um endpoint para o cadastro de produtos

router.post('/', rescue(async (req, res) => {
  const end = await tryAddProduct(req, res);
  return end;
}));

// 3 - Crie um endpoint para atualizar um produto

const updateProduct = async (req, res) => {
  const { body, params } = req;
  const quantity = validAmount(body.quantity);
  if (!validLength(body['name'])) {
    return res.status(UNPROCESSABE_ENTITY).json({err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }});
  } if (quantity === 'IsNaN' ) {
    return res.status(UNPROCESSABE_ENTITY).json({err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }});
  } if (quantity === 'IsLessOrEqual0') {
    return res.status(UNPROCESSABE_ENTITY).json({err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }});
  }
  const db = await connection();
  await db.collection('products').updateOne({_id: ObjectId(params.id)}, {
    $set: {
      name: body.name,
      quantity: body.quantity
    }
  });
  const isFound = await db.collection('products').findOne({ 'name': body['name']});
  return res.status(OK).json(isFound);
};

router.put('/:id', rescue(async (req, res) => {
  const end = await updateProduct(req, res);
  return end;
}));

// 2 - Crie um endpoint para listar os produtos
const getProduct = async (idParam) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(idParam));
  return product;
};

const findProduct = async (req, res) => {
  const { params } = req;
  if (params.id.length !== ID_LENGTH) {
    return res.status(UNPROCESSABE_ENTITY).json({err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }});
  }
  const product = await getProduct(params.id);
  return res.status(OK).json(product);
};

router.get('/:id', rescue(async (req, res) => {
  const end = await findProduct(req, res);
  return end;
}));

const getAllProducts = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

const findAllProduct = async (res) => {
  const allProducts = await getAllProducts();
  return res.status(OK).json({products: allProducts});
};

router.get('', rescue(async (_req, res) => {
  const end = await findAllProduct(res);
  return end;
}));

// 4 - Crie um endpoint para deletar um produto

const deleteProduct = async (idParam) => {
  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(idParam) });
};

const findToDelete = async (req, res, callback) => {
  const { params, body } = req;
  if (params.id.length !== ID_LENGTH) {
    return res.status(UNPROCESSABE_ENTITY).json({err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }});
  }
  await callback(params.id);
  return res.status(OK).json(body);
};

router.delete('/:id', rescue(async (req, res) => {
  const end = await findToDelete(req, res, deleteProduct );
  return end;
}));

module.exports = {
  router,
};