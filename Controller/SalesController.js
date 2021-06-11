const SalesService = require('../Service/SaleService');

const { StatusCodes } = require('http-status-codes');

const getAllSales = async (_req, res) => {
  console.log('[SALES CONTROLLER] : CHAMOU O MÉTODO BUSCAR AS SALES');
  try {
    const result = await SaleService.getAllSales();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[SALES CONTROLLER]: BUSCAR => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getOneSale = async (id) => {
  const result = await ProductModel.findById(id);
  return result;
};

const editSale = async () => {};
/*  if (!func.validName(name)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    };
  };

  if (!func.quantityIsNumber(quantity)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '\"quantity\" must be a number',
    };
  };

  if (!func.validInsertQuantity(quantity)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '\"quantity\" must be larger than or equal to 1',
    }; */

const createSale = async () => {};

const deleteSale = async () => {};

module.exports = {
  getAllSales,
  getOneSale,
  createSale,
  editSale,
  deleteSale,
};
