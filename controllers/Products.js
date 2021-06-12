const rescue = require('express-rescue');
const {
  lint2,
  lint,
  getAll,
  updateById,
  create,
  searchById,
  deleteById,
} = require('../models/Products');

const { HTTP_201_STATUS, HTTP_200_STATUS } = require('../common/httpStatus');
const { RESPONSE_ERROR } = require('../common/erroTypes');

const add = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await create(name, quantity);
  return res.status(HTTP_201_STATUS).json(newProduct);
});

const find = rescue(async (req, res) => {
  const { id } = req.params;
  const searchResult = await searchById(id);
  if (searchResult !== null) return res.status(HTTP_200_STATUS).json(searchResult);
  return res.status(RESPONSE_ERROR.eId.status).json({ err: RESPONSE_ERROR.eId.err });
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;
  const productDeleted = await deleteById(id);
  if (productDeleted !== null) return res.status(HTTP_200_STATUS).json(productDeleted);
  return res.status(RESPONSE_ERROR.eId.status).json({ err: RESPONSE_ERROR.eId.err });
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updateResult = await updateById(id, name, quantity);
  if (updateResult !== null) return res.status(HTTP_200_STATUS).json(updateResult);
  return res.status(RESPONSE_ERROR.eId.status).json({ err: RESPONSE_ERROR.eId.err });
});

const list = rescue(async (_req, res) => {
  const searchResult = await getAll();
  return res.status(HTTP_200_STATUS).json({ products: searchResult });
});

module.exports = {
  add,
  find,
  update,
  remove,
  list,
};
