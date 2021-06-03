const salesService = require('../services/sales');

const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

const create = async (req, res) => {
  const arr = req.body;

  const sale = await salesService.create(arr);
  if (typeof sale === 'string') return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: sale,
    }
  });

  res.status(OK).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(OK).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sales = await salesService.getById(id);
  if (typeof sales === 'string') return res.status(NOT_FOUND).json({
    err: {
      code: 'not_found',
      message: sales,
    }
  });

  res.status(OK).json(sales);
};

const update = async (req, res) => {
  const { id } = req.params;
  const arr = req.body;

  const sale = await salesService.update(id, arr);
  if (typeof sale === 'string') return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: sale,
    }
  });

  res.status(OK).json(sale);
};

const erase = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.erase(id);
  if (typeof sale === 'string') return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: sale,
    }
  });

  res.status(OK).json({ message: 'Sale deleted.' });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};
