const SalesModel = require('../models/salesModel');
const SalesServices = require('../services/salesServices');

const SUCCESS_CODE = 200;
const INVALID_CODE = 422;
const NOT_FOUND_CODE = 404;

const create = async (req, res, _next) => {
  const itens = req.body;

  const validation = await SalesServices.verifySalesItens(itens);
  if (validation) return res.status(INVALID_CODE).json({ err: validation });

  const updateProducts = await SalesServices.handleQuantitySale(null, itens);
  if (updateProducts) return res.status(NOT_FOUND_CODE).json({ err: updateProducts });

  const response = await SalesModel.createSales(itens);

  res.status(SUCCESS_CODE).json(response);
};

const getAll = async (req, res) => {
  const response = await SalesModel.getSales();

  if (!response) return res.status(NOT_FOUND_CODE).json({ err: 'None sales in DB' });

  res.status(SUCCESS_CODE).json({ sales: response });
};

const getById = async (req, res, _next) => {
  const { id } = req.params;

  const response = await SalesModel.getSalesById(id);

  if (!response) return res.status(NOT_FOUND_CODE)
    .json({ err: { code: 'not_found', message: 'Sale not found' } });


  res.status(SUCCESS_CODE).json(response);
};

const update = async (req, res, _next) => {
  const { id } = req.params;
  const itens = req.body;

  const validation = await SalesServices.verifySalesItens(itens);
  if (validation) return res.status(INVALID_CODE).json({ err: validation });

  const sales = await SalesModel.getSalesById(id);
  if (!sales) return res.status(INVALID_CODE)
    .json({ err: 'Unable to update sale' });

  const updateProducts = await SalesServices.handleQuantitySale(sales.itensSold, itens);
  if (updateProducts) return res.status(NOT_FOUND_CODE).json({ err: updateProducts });

  const response = await SalesModel.updateSale(id, itens);

  if (!response) return res.status(INVALID_CODE)
    .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });


  res.status(SUCCESS_CODE).json(response);
};

const remove = async (req, res, _next) => {
  const { id } = req.params;

  const sales = await SalesModel.getSalesById(id);
  if (!sales) return res.status(INVALID_CODE)
    .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });

  const returnedProducts = await SalesServices.handleQuantityReturned(sales.itensSold);
  if (returnedProducts) return res.status(NOT_FOUND_CODE).json({ err: returnedProducts });

  const response = await SalesModel.removeSale(id);
  if (!response) return res.status(INVALID_CODE)
    .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });

  res.status(SUCCESS_CODE).json(response);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
