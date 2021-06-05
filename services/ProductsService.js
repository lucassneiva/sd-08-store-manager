const productsModel = require('../models/ProductsModel');
const ProductsSchemas = require('../schemas/ProductsSchemas');
const { InvalidObjectID } = require('../schemas/errorMessages');

const registerProduct = async (name, quantity) => {
  const resp = ProductsSchemas.validateEntries(name, quantity)
    || await ProductsSchemas.checkIfNameExists(name);
   
  if(resp) return resp;
    
  const response = await productsModel.registerProduct(name, quantity);
  return response;
};

const getAllProducts = async () => {
  return await productsModel.getAllProducts();
};

const getProductByID = async (id) => {

  const productId = await productsModel.getProductByID(id);
  if(!productId) return InvalidObjectID;

  return productId[0];
};

const updateProductByID = async (id, name, quantity) => {
  const resp = ProductsSchemas.validateEntries(name, quantity);

  if(resp) return resp;

  const response = productsModel.updateProductByID(id, name, quantity);
  return response;
};

const deleteProductByID = async (id) => {
  const productDelete = await productsModel.deleteProductByID(id);

  if(!productDelete) return InvalidObjectID;
  return productDelete[0];
};

module.exports = {
  registerProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID
};
