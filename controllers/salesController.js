const service = require('../service/salesService');
const fail = 422;
const notFound = 404;
const success = 201;
const success2 = 200;

const createSale = async (req, res) => {
  try {
    const itensSold = req.body;
    const addedSale = await service.createSale(itensSold);
    res.status(success2).json(addedSale);
  } catch (err) {
    res.status(fail).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      },
    });
  }
};

const getAllSales = async (_req, res) => {
  const sales = await service.getAllSales();
  res.status(success2).json({ sales: sales });
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await service.findById(id);
    res.status(success2).json(sale);
  } catch (err) {
    res.status(notFound).json({
      err: {
        code: 'not_found',
        message: err.message,
      }
    });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const saleToDelete = await service.deleteSale(id);
    res.status(success2).json(saleToDelete);
    // await findById(id);
  } catch (err) {
    res.status(fail).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      },
    });
  }
};



module.exports = {
  createSale,
  getAllSales,
  findById,
  deleteSale,
};
