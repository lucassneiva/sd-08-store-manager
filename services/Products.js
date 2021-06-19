const Products = require('../models/Products');
const {UNPROCESSABLE_ENTITY}=require('./variableStatus');

const createProduct = async (name, quantity) => {
  const verifyName = await Products.findByName(name);
  if (verifyName) {
    return {
      error: {
        code: UNPROCESSABLE_ENTITY,
        message: 'Product already exists'
      }
    };
  }
  return await Products.createProduct(name, quantity);
};
const findAll = async () =>{
  const AllProdutcs = await Products.findAll();
  return AllProdutcs;
};

const findById = async (id)=>{
  const selectId = await Products.findById(id);
  if(!selectId){
    return {
      error:{
        code: UNPROCESSABLE_ENTITY,
        message: 'Wrong id format'
      }
    };
  }
  return selectId;
};
const updateItem = async (product) =>{
  const item = await Products.updateItem(product);
  return item;
};
const deleteItem = async (product) =>{
  
  const item = await Products.deleteItem(product);
  if(!item){
    return {
      error:{
        code: UNPROCESSABLE_ENTITY,
        message: 'Wrong id format'
      }
    };
  }
  return item;
};

module.exports = {
  createProduct,
  findAll,
  findById,
  updateItem,
  deleteItem
};