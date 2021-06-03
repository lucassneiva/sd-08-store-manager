const salesServices = require('../services/salesServices');

const unproceesableEntry = 422;
const statusOk = 200;
const notFound = 404;

const add = async (req, res) => {
  const sale = req.body;
  const validSale = await salesServices.valid(sale);
  if (validSale.err) res.status(unproceesableEntry).json(validSale);
  const result = await salesServices.add(sale);
  res.status(statusOk).json(result);

};

const getAll = async(req,res)=>{
  const allProd = await salesServices.getAll();
  res.status(statusOk).json(allProd);
};
const getById = async (req, res) => {
  const { id } = req.params;

  const sales = await salesServices.getById(id);

  if (sales.err) return res.status(notFound).json(sales);

  return res.status(statusOk).json(sales);
}; 

const updateOne = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const isValid = await salesServices.valid(data);
  if(isValid) res.status(unproceesableEntry).json(isValid);

  const updated = await salesServices.updateOne(id,data);

  return res.status(statusOk).json(updated);
}; 
const deleteOne = async(req,res)=>{
  const {id} = req.params;
  const deletedOne = await salesServices.deleteOne(id);
  if(deletedOne.err) res.status(unproceesableEntry).json(deletedOne);
  res.status(statusOk).json(deletedOne);
};


module.exports = {
  getById,getAll,add,updateOne,deleteOne
};