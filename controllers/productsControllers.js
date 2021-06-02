const productsServices = require('../services/productsServices');
const { messageError } = require('../schemas/productsSchemas');

const code_201 = 201;
const code_200 = 200;
const code_422 = 422;

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsServices.createProduct(name, quantity);
    res.status(code_201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(code_422).json(messageError(error.message));
  }
};

const getAllProduct = async (_req, res) => {
  try {
    const products = await productsServices.getAllProduct();
    res.status(code_200).json(products);
  } catch (error) {
    console.error(error);
    res.status(code_422).json({ message: 'Deu ruim!'});
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getProductById(id);
    return res.status(code_200).json(product);
  } catch (error) {
    const message = messageError(error.message);
    console.error(error.message);
    res.status(code_422).json(message);
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
};
