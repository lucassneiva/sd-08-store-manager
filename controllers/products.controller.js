const rescue = require('express-rescue');
const {
  registerNewProduct,
  findProductById,
  deleteProduct,
  updateProduct,
  listAllProducts,
} = require('../services/products.service');

const { ERROR_TYPES } = require('../common/erroTypes');

const { HTTP_201_STATUS, HTTP_200_STATUS } = require('../common/httpStatus');

const test = rescue(async (req, res) => {
  res.send({ messege: 'Nada aqui' });
});

const add = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await registerNewProduct(name, quantity);
  return res.status(HTTP_201_STATUS).json(newProduct);
});

const find = rescue(async (req, res) => {
  const { id } = req.params;
  const searchResult = await findProductById(id);
  if (searchResult) return res.status(HTTP_200_STATUS).json(searchResult);
  return res.status(ERROR_TYPES.eId.status).json({ err: ERROR_TYPES.eId.err });
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await deleteProduct(id);
  if (deletedProduct) return res.status(HTTP_200_STATUS).json(deletedProduct);
  return res.status(ERROR_TYPES.eId.status).json({ err: ERROR_TYPES.eId.err });
});
const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updateDoneResult = await updateProduct(id, name, quantity);
  if (updateDoneResult) return res.status(HTTP_200_STATUS).json(updateDoneResult);
  return res.status(ERROR_TYPES.eId.status).json({ err: ERROR_TYPES.eId.err });
});

const list = rescue(async (req, res) => {
  const searchResult = await listAllProducts();
  return res.status(HTTP_200_STATUS).json({ products: searchResult });
});

module.exports = {
  add,
  remove,
  update,
  find,
  list,
  test,
};
