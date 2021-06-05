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
const NOT_FOUND = 404;
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

app.get('/products/:id', rescue(async (req, res) => {
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

app.get('/products', rescue(async (_req, res) => {
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

app.delete('/products/:id', rescue(async (req, res) => {
  const end = await findToDelete(req, res, deleteProduct );
  return end;
}));

// 5 - Crie um endpoint para cadastrar vendas

const addSale = async (req, res) => {
  const { body } = req;
  const irregularQuantity = body.some(
    ({ quantity }) =>
      validAmount(quantity) === 'IsNaN' || validAmount(quantity) === 'IsLessOrEqual0'  );
  if (irregularQuantity) {
    return res.status(UNPROCESSABE_ENTITY).json({err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }});
  }
  const db = await connection();
  const insertion = await db.collection('sales').insertOne({'itensSold': body});
  console.log(insertion.ops[0]);
  return res.status(OK).json(insertion.ops[0]);
};

app.post('/sales', rescue(async (req, res) => {
  const end = await addSale(req, res);
  return end;
}));

// 6 - Crie um endpoint para listar as vendas

const getSales = async (idParam) => {
  const db = await connection();
  const sales = await db.collection('products').findOne(ObjectId(idParam));
  return sales;
};

const findSales = async (req, res) => {
  const { params } = req;
  if (params.id.length !== ID_LENGTH) {
    return res.status(NOT_FOUND).json({err: {
      code: 'not_found',
      message: 'Sale not found'
    }});
  }
  const sales = await getSales(params.id);
  return res.status(OK).json(sales);
};

app.get('/sales/:id', rescue(async (req, res) => {
  const end = await findSales(req, res);
  return end;
}));

const getAllSales = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const findAllSales = async (res) => {
  const allSales = await getAllSales();
  return res.status(OK).json({sales: allSales});
};

app.get('/sales', rescue(async (_req, res) => {
  const end = await findAllSales(res);
  return end;
}));