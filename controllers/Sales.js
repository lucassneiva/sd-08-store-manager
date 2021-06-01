const salesService = require('../services/Sales');
const sucess = 200;
const created = 201;
const error = 422;
const notFound = 404;

const createSales = async (req, res) => {
  const salesArr = req.body;
  console.log(req.body);
  const {err, data} = await salesService.createSales(salesArr);
  if(err) return res.status(error).json({err:err});
  return res.status(sucess).json(data);

};

// const getAll = async (req,res) => {
//   const sales = await salesService.getAll();
//   return res.status(sucess).json({sales}); 
// };

// const findById = async (req,res) => {
//   const {id} = req.params;
//   const {err, data} = await salesService.findById(id);
//   if(err) return res.status(notFound).json({err:err});
//   return res.status(sucess).json(data); 
// };


// const updateSales =  async (req, res) => {
//   const salesArr = req.body;
//   const {id} = req.params;
//   const {err,data} = await salesService.updateSales(id, {salesArr});
//   if(err) return res.status(error).json({err:err});
  
//   return res.status(sucess).json(data); 
// };

// const deleteSale =  async (req, res) => {
//   const {id} = req.params;
//   const {err, data} = await salesService.deleteSale(id);
//   if(err) return res.status(error).json({err:err});
  
//   return res.status(sucess).json(data); 
// };

module.exports = {
  createSales,
  // getAll,
  // findById,
  // updateSales,
  // deleteSale
};