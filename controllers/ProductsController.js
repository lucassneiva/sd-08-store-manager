const ProductsService = require('../services/ProductsService');

const UNP_ENTITY = 422;
const CREATED = 201;
const SUCCESS = 200;

const addProducts = async (req, res) => {
  const newProduct = req.body;
  
  const product = await ProductsService
    .addProduct(newProduct);

  if(product.err) {
    return res.status(UNP_ENTITY).json(product);
  }
  
  return res.status(CREATED).json(product);
};

const getAll = async (_req, res) => {

  const products = await ProductsService
    .getAll();

  return res.status(SUCCESS).json(products);
};

const getAllById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService
    .getAllById(id);

  if (product.err) {
    return res.status(UNP_ENTITY).json(product);
  }

  return res.status(SUCCESS).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;

  const productToUpdate = await ProductsService
    .updateProduct(id, newProduct);

  if (productToUpdate.err) {
    return res.status(UNP_ENTITY).json(productToUpdate);
  }

  return res.status(SUCCESS).json(productToUpdate);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const productToDelete = await ProductsService
    .deleteProduct(id);

  if (productToDelete.err) {
    return res.status(UNP_ENTITY).json(productToDelete);
  }

  return res.status(SUCCESS).json(productToDelete);
};


module.exports = {
  addProducts,
  getAll,
  getAllById,
  updateProduct,
  deleteProduct,
};
