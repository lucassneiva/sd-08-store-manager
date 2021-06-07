const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTRY = 422;
const idAndQuantErr = 'Wrong product ID or invalid quantity';

const create = async (salesMade) => {
  // Será validado que não é possível cadastrar vendas com quantidade menor que zero
  // Será validado que não é possível cadastrar vendas com quantidade igual a zero
  const minQuantity = 1;
  const haveNoMin = salesMade.find((sale) => sale.quantity < minQuantity);

  if (haveNoMin) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: idAndQuantErr,
    }
  });

  // Será validado que não é possível cadastrar vendas com uma string no campo quantidade
  const isNotNumber = salesMade.find((sale) => typeof sale.quantity !== 'number');

  if (isNotNumber) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: idAndQuantErr,
    }
  });

  const sale = await SalesModel
    .create(salesMade);

  return {
    status: SUCCESS,
    sale,
  };
};

const getAll = async () => {
  const allSales = await SalesModel
    .getAll();

  return {
    sales: [...allSales]
  };
};

const getById = async (id) => {
  const sale = await SalesModel
    .getById(id);

  if (!sale) return ({
    status: NOT_FOUND,
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });

  return {
    status: SUCCESS,
    sale,
  };
};

const updateById = async (id, changes) => {
  // Será validado que não é possível atualizar vendas com quantidade menor que zero
  // Será validado que não é possível atualizar vendas com quantidade igual a zero
  const minQuantity = 1;
  const quantityError = changes.find((sale) => sale.quantity < minQuantity);

  if (quantityError) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: idAndQuantErr,
    }
  });

  // Será validado que não é possível atualizar vendas com uma string no campo quantidade
  const quantityNotNumber = changes.find((sale) => typeof sale.quantity !== 'number');

  if (quantityNotNumber) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: idAndQuantErr,
    }
  });

  const updated = await SalesModel
    .updateById(id, changes);

  if (!updated) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: idAndQuantErr,
    }
  });

  return {
    status: SUCCESS,
    updated,
  };
};

const deleteById = async (id) => {
  const deleted = await SalesModel
    .deleteById(id);

  if (!deleted) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    }
  });

  return {
    status: SUCCESS,
    deleted,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
