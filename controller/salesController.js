const service = require('../service/salesServices');
const rescue = require('express-rescue');

const deuBom = 200;
const deuBomTb = 201;
const deuRuim = 422;

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

module.exports = {
  create,
};
