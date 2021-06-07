const saleService = require('../services/saleService');
const status = require('../constants/statusCode');

const getAllSales = async (req, res) => {
  try {
    const sales = await saleService.getAll();
    res.status(status.OK).json( {sales:sales} );
  } catch (err) {
    console.error(err);
    res.status(status.INTERNAL_SERVER_ERROR)
      .send({ message: 'erro ao solicitar requisição' });
  }
};
const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getById(id);

  if (sale !== null) {
    return res.status(status.OK).send(sale);
  } else {
    res.status(status.NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
};

const addSales = async (req, res) => {
  const newSale = req.body;
  const sale = await saleService.add(newSale);
  if (sale !== null) {
    return res.status(status.OK).json(sale);
  } else {
    res.status(status.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
};

const updateSale = async (req, res) => {
  try {
    const newSale = req.body;
    const { id } = req.params;
    const sale = await saleService.update(id, newSale);
    res.status(status.OK).send(sale);
  } catch (err) {
    console.error(err);
    res.status(status.INTERNAL_SERVER_ERROR)
      .send({ message: 'erro ao solicitar requisição' });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.exclude(id);
  if (sale !== null) {
    return res.status(status.OK).send(sale);
  } else {
    res.status(status.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  addSales,
  updateSale,
  deleteSale,
};
