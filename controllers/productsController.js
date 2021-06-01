const productsModel = require('../models/productsModel');

const Created = 201;
const OK = 200;
const ERROR = 422;

const newProducts = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await productsModel.newProduct(name, quantity);

    res.status(Created).json(newProduct);
  } catch (error) {
    res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
  }
};

const getAll = async (_req, res) => {
  const products = await productsModel.getAll();

  res.status(OK).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsModel.getById(id);

    if (!product){
      return res.status(ERROR)
        .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }

    res.status(OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  
  try {
    const products = await productsModel.update(req.params.id, name, quantity);

    res.status(OK).json(products);
  } catch (error) {
    res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
  }
};

const exclude = async (req, res) => {
  try {
    const products = await productsModel.exclude(req.params.id);

    res.status(OK).json(products);
  } catch (error) {
    res.status(ERROR)
      .json( { err: { code: error.code, message: error.message } } );
  }
};

module.exports = { newProducts, getAll, getById, updateProduct, exclude };
