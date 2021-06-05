const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./models/connection');
const { ObjectId } = require('mongodb');
const {
  validAmount
} = require('./service/validation');
const rescue = require('express-rescue');
const {
  UNPROCESSABE_ENTITY,
  NOT_FOUND,
  CREATED,
  OK,
  ID_LENGTH
} = require('./service/consts');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = '3000';
app.listen(PORT, () => {
  console.log('Online');
});

app.use('/products', require('./models/productsModel'));

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

// 7 - Crie um endpoint para atualizar uma venda

const updateSales = async (req, res) => {
  const { body, params } = req;
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
  await db.collection('sales').updateOne({_id: ObjectId(params.id)}, {
    $set: {
      itensSold: body
    }
  });
  const isFound = await db.collection('sales').findOne( {_id: ObjectId(params.id)} );
  return res.status(OK).json(isFound);
};

app.put('/sales/:id', rescue(async (req, res) => {
  const end = await updateSales(req, res);
  return end;
}));