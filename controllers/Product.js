const productService = require('../services/Product');
const productModel = require('../models/Products');
const sucess = 200;
const created = 201;
const error = 422;

const createProducts = async (req, res) => {
  const {name, quantity} = req.body;
  const {data, err} = await productService.createProducts(name, quantity);

  if(err) return res.status(error).json({err:err});
     
  return res.status(created).json(data);
};

const getAll = async (req,res) => {
  const products = await productService.getAll();
  return res.status(sucess).json({products}); 
};

const findById = async (req,res) => {
  const {id} = req.params;
  const {err, data} = await productService.findById(id);
  if(err) return res.status(error).json({err:err});
  return res.status(sucess).json(data); 
};
    
const updateProduct =  async (req, res) => {
  const {name, quantity} = req.body;
  const {id} = req.params;
  const {err,data} = await productService.updateProduct(id, {name, quantity});
  if(err) return res.status(error).json({err:err});

  return res.status(sucess).json(data); 
};

const deleteProduct =  async (req, res) => {
  const {id} = req.params;
  const {err, data} = await productService.deleteProduct(id);
  if(err) return res.status(error).json({err:err});

  return res.status(sucess).json(data); 
};


module.exports  = {
  createProducts,
  getAll,
  findById,
  updateProduct,
  deleteProduct
};
