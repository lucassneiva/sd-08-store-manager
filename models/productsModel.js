const { PRODUCTS } = require('./constants');
const {
  getById, addNew, getAll, deleteById, getByKeysValues, update } = require('./functions');

const getProductByName = async(nameToFind) => (
  await getByKeysValues({name: nameToFind}, PRODUCTS )
);

const addProduct = async(name, quantity) => await addNew({name, quantity}, PRODUCTS);

const getAllProducts = async() => await getAll(PRODUCTS);

const getProductById = async(id) =>  await getById(id, PRODUCTS);

const deleteProductById = async(id) => await deleteById(id, PRODUCTS);

const updateProduct = async(id, name, quantity) => (
  await update(id, {name, quantity}, PRODUCTS)
); 

module.exports = {
  getProductByName,
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProductById,
};

