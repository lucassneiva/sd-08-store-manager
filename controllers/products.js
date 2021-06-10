const productsServices = require('../services/products');

// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
const STATUS_200 = 200; // Respostas de sucesso (200-299)
const STATUS_201= 201;
const STATUS_422 = 422; // Erros do cliente (400-499)

// CREATE ----------------------------------------
const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsServices.create(name, quantity);
  if (newProduct !== null) {
    return res.status(STATUS_201).json(newProduct);
  } else { return res.status(STATUS_422).json({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  });
  }
};

// GETALL ------------------------------------------
const getAll = async (_req, res) => {
  const products = await productsServices.getAll();
  return res.status(STATUS_200).json({ products: products});
};

// GETBYID -------------------------------------------
const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getById(id);
  if (product !== null) {
    return res.status(STATUS_200).send(product);
  }
  return res.status(STATUS_422).json({ err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
  });
};

// UPDATEBYID -----------------------------------------
const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const product = await productsServices.updateById(id, updatedProduct);
  return res.status(STATUS_200).json(product);
};

// DELETEBYID -----------------------------------------
const deleteById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.deleteById(id);
  if (product !== null) return res.status(STATUS_200).send(product);
  return res.status(STATUS_422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
};


module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
