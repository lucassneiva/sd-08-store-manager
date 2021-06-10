const salesServices = require('../services/sales');

// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
const STATUS_200 = 200; // Respostas de sucesso (200-299)
const STATUS_404 = 404;
const STATUS_422 = 422; // Erros do cliente (400-499)

// CREATE ----------------------------------------
const create = async (req, res) => {
  const bodySales = req.body;
  const newSales = await salesServices.create(bodySales);
  if (newSales !== null) {
    return res.status(STATUS_200).json(newSales);
  } else { return res.status(STATUS_422).json({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  });
  }
};

// GETALL ------------------------------------------
const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();
  return res.status(STATUS_200).json({ sales: sales});
};

// // GETBYID -------------------------------------------
const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesServices.getById(id);
  if (sales !== null) {
    return res.status(STATUS_200).send(sales);
  }
  return res.status(STATUS_404).json({ err: {
    code: 'not_found',
    message: 'Sale not found',
  },
  });
};

// // UPDATEBYID -----------------------------------------
const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedSales= req.body;
  const sales = await salesServices.updateById(id, updatedSales);
  return res.status(STATUS_200).json(sales);
};

// // DELETEBYID -----------------------------------------
const deleteById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesServices.deleteById(id);
  if (sales !== null) return res.status(STATUS_200).send(sales);
  return res.status(STATUS_422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  });
};


module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
