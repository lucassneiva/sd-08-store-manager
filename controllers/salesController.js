const {
  addSales, getAllSales, getSaleById, updateSale, deleteSale, checkSaleExists
} = require('../services/saleServices');
const { UNPROCESSABLE, OK, NOT_FOUND } = require('./constants');

const addsSales = async(req, res) => {
  
  const sale = req.body;
  const addedSale = await addSales(sale);
    
  if(addedSale.err) {
    return res.status(UNPROCESSABLE).json(addedSale);
  };
  res.status(OK).json(addedSale);

};

const getsAllSales = async(_req, res) => {
  const allSales = await getAllSales();
  res.status(OK).json({sales: allSales});
};

const getsSale = async(req, res) => {
  const id = req.params;
  const foundSale = await getSaleById(id);
  if(foundSale.err) return res.status(NOT_FOUND).json(foundSale);
  return res.status(OK).json(foundSale);
};

const updatesSale = async(req, res) => {
  const { id } = req.params;
  const toUpdate = req.body;
  const afterUpdated = await updateSale(id, toUpdate);

  if(afterUpdated.err) return res.status(UNPROCESSABLE).json(afterUpdated);
  return res.status(OK).json(afterUpdated);
};

const deletesSale = async(req, res) => {
  const { id } = req.params;

  const saleExists = await checkSaleExists(id);
  if(!saleExists) return res.startus(UNPROCESSABLE).json(saleExists);

  const deletedSale = await deleteSale(id);
  if(deletedSale.err) return res.status(UNPROCESSABLE).json(deletedSale);
  return res.status(OK).json(deletedSale);
};

module.exports = {
  addsSales,
  getsAllSales,
  getsSale,
  updatesSale,
  deletesSale
};
