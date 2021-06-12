const rescue = require('express-rescue');
const {
  lint,
  create,
  searchById,
  updateById,
  deleteById,
  getAll,
} = require('../services/Sales.service');

const { HTTP_200_STATUS } = require('../common/httpStatus');
const { RESPONSE_ERROR } = require('../common/erroTypes');

const add = rescue(async (req, res) => {
  const products = req.body;
  const newSale = await create(products);
  return res.status(HTTP_200_STATUS).json(newSale);
});

const find = rescue(async (req, res) => {
  const { id } = req.params;
  const searchResult = await searchById(id);
  if (searchResult !== null) return res.status(HTTP_200_STATUS).json(searchResult);
  return res.status(RESPONSE_ERROR.eSaleId.status).json({
    err: RESPONSE_ERROR.eSaleId.err,
  });
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const newInfos = req.body[0];
  const { productId, quantity } = newInfos;
  const updateResult = await updateById(id, productId, quantity);
  if (updateResult !== null) return res.status(HTTP_200_STATUS).json(updateResult);
  return res.status(RESPONSE_ERROR.eSaleId.status).json({
    err: RESPONSE_ERROR.eSaleId.err,
  });
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;
  const saleDeleted = await deleteById(id);
  if (saleDeleted !== null) return res.status(HTTP_200_STATUS).json(saleDeleted);
  return res.status(RESPONSE_ERROR.eDel.status).json({
    err: RESPONSE_ERROR.eDel.err,
  });
});

const list = rescue(async (_req, res) => {
  const searchResult = await getAll();
  return res.status(HTTP_200_STATUS).json({ sales: searchResult });
});

module.exports = {
  add,
  find,
  update,
  remove,
  list,
};
