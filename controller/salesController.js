const service = require('../service/salesServices');
const rescue = require('express-rescue');

const deuBom = 200;
const deuBomTb = 201;
const deuRuim = 422;
const deuRuimTb = 404;


const create = async(req, res) => {
  try {
    const itensSold = req.body;
    const newSales = await service.newSale(itensSold);

    res.status(deuBom).json(newSales);

  } catch (e) {
    res.status(deuRuim).json( {err: 
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

    res.status(deuBom).json(result);

  } catch (e) {
    res.status(deuRuimTb).json({err: 
      { 
        code: 'not_found',
        message: e.message
      }
    });
  }
};

const getAll = rescue(async (_req, res) => {
  const sales = await service.getAll();
  res.status(deuBom).json({sales: sales});
});

const excludeSale = async(req, res) => {
  try {
    const { id } = req.params;
    const notSale = await service.exclude(id);
    // console.log(notSale);
    res.status(deuBom).json(notSale);
  } catch (e) {
    // console.log(e);
    res.status(deuRuim).json({err: 
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

    const result = await service.update(id, sale);

    res.status(deuBom).json(result);
  } catch (e) {
    res.status(deuRuim).json( {err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    } );
  }
};

module.exports = {
  updateSale,
  excludeSale,
  create,
  getAll,
  getSaleById,
};
