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
  return res.status(OK).json(insertion.ops[0]);
};

app.post('/sales', rescue(async (req, res) => {
  const end = await addSale(req, res);
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

// 8 - Crie um endpoint para deletar uma venda

const deleteSales = async (idParam) => {
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(idParam) });
};

const findToDelete = async (req, res) => {
  const { params, body } = req;
  if (params.id.length !== ID_LENGTH) {
    return res.status(UNPROCESSABE_ENTITY).json({err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }});
  }
  await deleteSales(params.id);
  return res.status(OK).json(body);
};

app.delete('/sales/:id', rescue(async (req, res) => {
  const end = await findToDelete(req, res);
  return end;
}));

// 6 - Crie um endpoint para listar as vendas

const existSale = async (res, idParam) => {
  if (idParam !== ID_LENGTH ) {
    return res.status(NOT_FOUND).json({err: {
      code: 'not_found',
      message: 'Sale not found'
    }});
  }
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(idParam) });
  console.log('existSale', sale);
  return sale;
};

// const getSales = async (idParam) => {
//   const db = await connection();
//   const sales = await db.collection('products').findOne(ObjectId(idParam));
//   return sales;
// };

const findSales = async (req, res) => {
  const { params } = req;
  const sale = await existSale(res, params.id);
  if (!sale) {
    return res.status(NOT_FOUND).json({err: {
      code: 'not_found',
      message: 'Sale not found'
    }});
  }
  // const sales = await getSales(params.id);
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