const productServices = require('../services/productServices');

const create = async (req, res) => {
  const newProduct = req.body;
  const { status, result } = await productServices.createProduct(newProduct);
  return res.status(status).json(result);
};

const search = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await productServices.search(id);
  return res.status(status).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const { status, result } = await productServices.update(id, newData);
  return res.status(status).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await productServices.remove(id);
  return res.status(status).json(result);
};

module.exports = { create, search, update, remove };
