const connection = require('./connection');
const { ObjectId } = require('mongodb');


/************* CADASTRO DE VENDAS *************/
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
  if (sales) return sales;
};

const getById = async (id) => {
  const db = await connection();
  const salesId = await db.collection('sales').findOne(ObjectId(id));
  return salesId;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const salesId = await db.collection('sales').findOne(ObjectId(id));
  console.log(salesId);

  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return salesId;
};

const updateSale = async ( id, sale ) => {
  const db = await connection();
  await  db.collection('sales')
    .updateOne({ _id: id }, { $set: { itensSold: sale } });
  return { _id: id, itensSold: sale };
};


module.exports = {
  updateSale,
  deleteSale,
  createSale, 
  getAll,
  getById,

};
