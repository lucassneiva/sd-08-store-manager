const salesModel = require('../models/salesModel');

const create = async (arrDataForUpdate)=>{

  const createSales = async () =>{

    return arrDataForUpdate.reduce(async(asyncAcc, cur) =>{
      const acc = await asyncAcc;

      const { insertedId } = await salesModel.create(cur);

      const result =  { _id: insertedId, itensSold: cur};

      await acc.push(result);

      return acc;

    }, Promise.resolve([]));

  };

  return await createSales();
};

const getAll = ()=>{
  return salesModel.getAll();
};
// create([{productId: 'ddasdas', quantity: 10}, {productId: 'ddasdas', quantity: 10}, {productId: 'ddasdas', quantity: 10}]).then(console.log);
getAll().then(console.log);

module.exports ={
  create, 
  getAll,
};

