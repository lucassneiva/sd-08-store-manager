const { Code } = require('mongodb');
const salesService = require('.././services/sales');

// const NEW_ITEM = 201;
const INTERNAL_ERROR = 500;
const SUCESS = 200;
const ERROR = 404;
// const UNPROCESSABLE_ENTITY = 422;

const controllerSales = async (req, res) => {
  try {
    const itensSold = req.body;
    const result = await salesService.addNewSale(itensSold);
    res.status(SUCESS).json(result);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({error : error.message});
  }
};

const controllerGetAllSales = async (req, res) => {
  try {
    const getAll = await salesService.getAllSales();
    return res.status(SUCESS).json({sales : getAll});
  } catch (error) {
    res.status(INTERNAL_ERROR).json({error : error.message});  
  }
};

const controllerGetById = async (req, res) => {
  try {
    const id = req.params;
    const getById = await salesService.getById(id);
    if(!getById)
      return res.status(ERROR).json({
        err: {
          code: 'not_found',
          message: 'Sale not found'}
      });
    return res.status(SUCESS).json(getById);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({error: error.message});
  };
};

module.exports = {
  controllerSales,
  controllerGetAllSales,
  controllerGetById,
};
