const sales = require('../services/Sales');
const {error, update, success, notFound} = require('../services/Responses');
const { saleCheck } = require('../middlewares/saleCheck');

const addSale = async (req, res) => {
  saleCheck(req, res);
  const data = await sales.addSale(req);
  return data.err ? res.status(error).json(data) : res.status(success).json(data);
};

const getAll = async (req, res) => {
  const { id } = req.params;
  const data = await sales.getAll(req);
  if(!id) return res.status(success).json(data);
  if(data.err) return res.status(notFound).json(data);
  return res.status(success).json(data);
};

const updateSale = async (req, res) => {
  saleCheck(req, res);
  const data = await sales.updateSale(req);
  if(data.err) return res.status(error).json(data);
  return res.status(success).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const data = await sales.deleteSale(id);
  if(data.err) return res.status(error).json(data);
  return res.status(success).json(data);
};

module.exports = {
  addSale, getAll, updateSale, deleteSale
};