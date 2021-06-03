const {
  addProduct,
  getAllProducts,
  getOneProduct,
  editProduct,
  removeProduct,
} = require('../models/ProductsModel');
const { results } = require('../services/ErrorMessage');

module.exports = {
  add: async (req, res) => {
    const { name, quantity } = req.body;
    const result = await addProduct(name, quantity);
    res.status(results.created).json(result);
  },
  getAll: async (req, res) => {
    const result = await getAllProducts();
    res.status(results.ok).json(result);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const result = await getOneProduct(id);
    if (result.err !== undefined) {
      return res.status(results.unprocessable).json(result);
    }
    res.status(results.ok).json(result);
  },
  edit: async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const result = await editProduct(id, name, quantity);
    res.status(results.ok).json(result);
  },
  remove: async (req, res) => {
    const { id } = req.params;
    let result = await getOneProduct(id);
    if (result._id !== undefined) {
      await removeProduct(id);
      return res.status(results.ok).json(result);
    }
    res.status(results.unprocessable).json(result);
  },
};
