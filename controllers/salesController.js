const salesServices = require('../services/salesServices');

const statusOK = 200;
const notFound = 404;

const getAll = async(req,res)=>{
  const allProd = await salesServices.getAll();
  res.status(statusOK).json(allProd);
};
const getById = async (req, res) => {
  const { id } = req.params;

  const sales = await salesServices.getById(id);

  if (sales.err) return res.status(notFound).json(sales);

  return res.status(statusOK).json(sales);
};
module.exports = {
  getAll,getById
};