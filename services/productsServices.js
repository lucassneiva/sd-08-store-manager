const Products = require('../models/productsModels');
const Helper = require('../helpers');

const addProduct = async (name, quantity) => {
  const nameValidation = Helper.nameValid(name);
  const quantityValidation = Helper.quantityValid(quantity);
  const existingProduct = await Helper.nameExists(name);

  if (nameValidation.err) return nameValidation;
  if (quantityValidation.err) return quantityValidation;
  if (existingProduct.err) return existingProduct;

  return Products.addProduct(name, quantity);
};

const getAllProducts = async () => {
  const allProducts = await Products.getAllProducts();
  return { products: allProducts };
};

const getProductById = async (id) => {
  const idValidation = Helper.idValid(id);
  if (idValidation.err) return idValidation;

  const productById = await Products.getProductById(id);
  return productById;
};

const updateProduct = async (id, name, quantity) => {
  const nameValidation = Helper.nameValid(name);
  const quantityValidation = Helper.quantityValid(quantity);

  if (nameValidation.err) return nameValidation;
  if (quantityValidation.err) return quantityValidation;

  const updatedProduct = await Products.updateProduct(id, name, quantity);
  return { _id: id, ...updatedProduct };
};

const deleteProduct = async (id) => {
  const idValidation = Helper.idValid(id);
  if (idValidation.err) return idValidation;

  const deletedProduct = await Products.deleteProduct(id);
  return deletedProduct;
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
