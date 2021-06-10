const productsServices = require('../services/productsServices');
const rescue = require('express-rescue');
const ERROR_CODE = 422;
const STATUS_OK = 200;

const insert = async (req, res) => {
  const { name, quantity } = req.body;

  const body = await productsServices.insert(name, quantity);

  if(body.err) return res.status(body.status).json(body);

  return res.status(body.status).json(body.data);
};

const findByID = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.findById(id);

  if(!product) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Wrong id format' } });

  return res.status(product.status).json(product.data);
};

const getAll = async (_req, res) => {
  const data = await productsServices.getAll();

  if(!data) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Something went wrong' } });

  return res.status(STATUS_OK).json(data);
};

const updateByID = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productsServices.findById(id);

  const correctName = name? name : product.data.name;
  const correctQuantity = quantity !== undefined ? quantity : product.data.quantity;

  const data = await productsServices.updateByID(id, correctName, correctQuantity);

  if(data.err) return res.status(data.status).json(data);

  if (!data) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Wrong id format' } });


  return res.status(data.status).json(data.message);
};

module.exports = {
  insert,
  findByID,
  getAll,
  updateByID
};
