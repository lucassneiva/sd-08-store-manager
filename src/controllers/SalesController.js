const service = require('../services/SalesService');
const rescue = require('express-rescue');

const CODE_200 = 200;
const CODE_201 = 201;
const ERROR_CODE_422 = 422;
const ERROR_CODE_404 = 404;


const create = async(req, res) => {
  try {
    const itensSold = req.body;
    const newSales = await service.newSale(itensSold);

    res.status(CODE_200).json(newSales);

  } catch (e) {
    res.status(ERROR_CODE_422).json( {err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    } );
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await service.getById(id);  

    res.status(CODE_200).json(result);

  } catch (e) {
    res.status(ERROR_CODE_404).json({err: 
      { 
        code: 'not_found',
        message: e.message
      }
    });
  }
};

const getAll = rescue(async (_req, res) => {
  const sales = await service.getAll();
  res.status(CODE_200).json({sales: sales});
});

const deleteSale = async(req, res) => {
  try {

    const { id } = req.params;

    const notSale = await service.deleteSale(id);

    res.status(CODE_200).json(notSale);
    
  } catch (e) {
    res.status(ERROR_CODE_422).json({err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    } );
  }
};

const updateSale = async (req, res) => {
  try {

    const sale = req.body;
    const { id } = req.params;

    const result = await service.updateSale(id, sale);
    res.status(CODE_200).json(result);

  } catch (e) {

    res.status(ERROR_CODE_422).json( {err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    } );
  }
};

module.exports = {
  updateSale,
  deleteSale,
  create,
  getAll,
  getSaleById,
};