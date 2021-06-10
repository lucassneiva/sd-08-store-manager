const { updateOne, getOne } = require('../models/productsModel');

const typeOptions = {
  'update': (currValue,newValue) => currValue - newValue,
  'delete': (currValue,newValue) => currValue + newValue,
};

const updateProducts = async (saleArray, type ) => {
  await Promise.all(saleArray.map( async ({productId, quantity}) => {
    const { name, quantity: currValue } = await getOne(productId);
    const newQuantity = typeOptions[type](currValue, quantity);
    await updateOne(productId, name, newQuantity);
  }));
};

const checkStock = async (saleArray) =>{
  return await Promise.all(saleArray.map( async ({productId, quantity}) => {
    const { quantity: currValue } = await getOne(productId);
    return currValue >= quantity;
  }));
};

module.exports = {updateProducts , checkStock};