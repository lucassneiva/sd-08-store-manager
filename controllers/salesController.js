const SalesService = require('../services/salesService');

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTRY = 422;

const create = async (req, res) => {
  const salesMade = req.body;

  const { status, err, sale } = await SalesService
    .create(salesMade);

  if (status !== SUCCESS) return res.status(status).json({err});

  res.status(status).json(sale);
};

const getAll = async (req, res) => {
  const allSales = await SalesService
    .getAll();

  res.status(SUCCESS).json(allSales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, err, sale } = await SalesService
    .getById(id);

  if (status !== SUCCESS) return res.status(status).json({err});

  res.status(status).json(sale);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  const { status, err, updated } = await SalesService
    .updateById(id, changes);

  if (status !== SUCCESS) return res.status(status).json({err});

  res.status(status).json(updated);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const { status, err, deleted } = await SalesService
    .deleteById(id);

  if (status !== SUCCESS) return res.status(status).json({err});
  
  res.status(status).json(deleted);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
