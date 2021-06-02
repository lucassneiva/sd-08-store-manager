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

// const findSale= async (sale) => {
//   const db = await connection();
//   const isFound = await db.collection('sales').findOne({sale});
//   // console.log('aoba', isFound);
//   return isFound;
// };

module.exports = {
  createSale, 
  // findSale,
};
