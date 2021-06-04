const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./models/connection');
const { ObjectId } = require('mongodb');

const app = express();
app.use(bodyParser.json());

const rescue = require('express-rescue');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = '3000';
app.listen(PORT, () => {
  console.log('Online');
});

const UNPROCESSABE_ENTITY = 422;
const CREATED = 201;
const OK = 200;
const ID_LENGTH = 24;


// 1 - Crie um endpoint para o cadastro de produtos

const existProduct = async ( name ) => {
  const db = await connection();
  const isFound = await db.collection('products').findOne({ 'name': name});
  return isFound;
};

const validLength = (name) => {
  const MINLENGTH = 5;
  return name.length >= MINLENGTH;
};

const validAmount = (amount) => {
  const NULO = 0;
  const amountNumber = Number(amount);
  if (isNaN(amountNumber)) {
    return 'IsNaN';
  } if (amountNumber <= NULO) {
    return 'IsLessOrEqual0';
  }
};

const addProduct = async (req, res) => {
  const { body } = req;
  const quantity = validAmount(body.quantity);
  if (await existProduct(body['name'])) {
    return res.status(UNPROCESSABE_ENTITY).json({err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }});
  } if (!validLength(body['name'])) {
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
  await db.collection('products').insertOne(body);
  const isFound = await db.collection('products').findOne({ 'name': body['name']});
  return res.status(CREATED).json(isFound);
};

app.post('/products', rescue(async (req, res) => {
  const end = await addProduct(req, res);
  return end;
}));

// 3 - Crie um endpoint para atualizar um produto

const updateProduct = async (req, res) => {
  const { body, params } = req;
  const quantity = validAmount(body.quantity);
  // if (await existProduct(body['name'])) {
  //   return res.status(UNPROCESSABE_ENTITY).json({err: {
  //     code: 'invalid_data',
  //     message: 'Product already exists'
  //   }});
  // } 
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

app.put('/products/:id', rescue(async (req, res) => {
  const end = await updateProduct(req, res);
  return end;
}));

// 2 - Crie um endpoint para listar os produtos
const getProduct = async (idParam) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(idParam));
  console.log(product);
  return product;
};

const findProduct = async (req, res) => {
  const { params } = req;
  console.log(params.id);
  if (params.id.length !== ID_LENGTH) {
    return res.status(UNPROCESSABE_ENTITY).json({err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }});
  }
  const product = await getProduct(params.id);
  return res.status(OK).json(product);
};

app.get('/products/:id', rescue(async (req, res) => {
  const end = await findProduct(req, res);
  return end;
}));

const getAllProducts = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  console.log(allProducts);
  return allProducts;
};

const findAllProduct = async (res) => {
  const allProducts = await getAllProducts();
  return res.status(OK).json({products: allProducts});
};

app.get('/products', rescue(async (_req, res) => {
  const end = await findAllProduct(res);
  return end;
}));
