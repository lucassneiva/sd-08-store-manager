const salesService = require('.././services/sales');

// const NEW_ITEM = 201;
const INTERNAL_ERROR = 500;
const SUCESS = 200;
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

module.exports = {
  controllerSales
};
