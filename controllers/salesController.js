const { addSales } = require('../services/saleServices');
const { UNPROCESSABLE, OK } = require('./constants');

const addsSales = async(req, res) => {
  
  const sale = req.body;
  const addedSale = await addSales(sale);
    
  if(addedSale.err) {
    return res.status(UNPROCESSABLE).json(addedSale);
  };
  res.status(OK).json(addedSale);

};

module.exports = {
  addsSales
};
