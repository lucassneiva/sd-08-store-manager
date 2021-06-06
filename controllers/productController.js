const service = require('../services/products');

const create = async (req, res) => {
  const newProduct = req.body;
  const { status, result } = await service.create(newProduct);
  return res.status(status).send(result);
};

const getAll = async (req, res) => {};

const getById = async (req, res) => {};

const update = async (req, res) => {};

const remove = async (req, res) => {};

module.exports = { create, getAll, getById, update, remove };
