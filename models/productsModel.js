const { PRODUCTS } = require('./constants');
const {
  getById, addNew, getAll, deleteById, getByKeysValues, update,
  decreaseQuantity, increaseQuantity
} = require('./functions');

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

const decreaseProductQuantity = async(id, quantityToDecrease) => {
  await decreaseQuantity(id, quantityToDecrease, PRODUCTS);
};

const increaseProductQuantity = async(id, quantityToIncrease) => {
  await increaseQuantity(id, quantityToIncrease, PRODUCTS);
};

module.exports = {
  getProductByName,
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProductById,
  decreaseProductQuantity,
  increaseProductQuantity,
};

