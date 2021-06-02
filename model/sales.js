const connection = require('./conn');
const { ObjectId } = require('mongodb');

const createSale = async (sale) =>{
  const db = await connection();
  await db.collection('sales')
    .insertOne({ 
      itensSold: sale,
    });
  const allSales = await db.collection('sales').find().toArray();

  return allSales[0];
};

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  // console.log(sales);
  if (sales) return sales;
};

const getById = async (id) => {
  const db = await connection();
  const salesId = await db.collection('sales').findOne(ObjectId(id));
  // console.log(salesId);
  return salesId;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  // poderia ser utilizada também a função do getById, mas por fins didáticos, utilizarei esse linha.
  // console.log('inicios', await getAll());
  const salesId = await db.collection('sales').findOne(ObjectId(id));
  console.log(salesId);

  await db.collection('sales').deleteOne({ _id: ObjectId(id)});
  // console.log('finoz', await getAll());

  return salesId;
};

const update = async ( id, sale ) => {
  const db = await connection();
  await  db.collection('sales')
    .updateOne({ _id: id}, { $set: { itensSold: sale } });
  return { _id: id, itensSold: sale};
};


module.exports = {
  update,
  exclude,
  createSale, 
  getAll,
  getById,

};
