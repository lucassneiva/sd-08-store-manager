
const productServices = require('../services/productServices');

const err422 = 422;
const statusOk = 200;
const created = 201;
const err500 = 500;


const addProducts = async(req,res)=>{

  const product = req.body;
  const isValid = productServices.validProduct(product);
  if(isValid) return res.status(err422).json(isValid);
  const result = await productServices.addProduct(product);
  if (result.err) return res.status(err422).json(result);
  res.status(created).json(result);
};
const getOne = async(req,res)=>{
  const { id } = req.params;
  const result = await productServices.getOne(id);
 
  if (result.err) {
    return res.status(err422).json(result);
  }
  return  res.status(statusOk).send(result);
};
const getAll = async(req,res)=>{
  const product = await productServices.getAll();
  return res.status(statusOk).json(product);
};

const updateOne = async(req,res)=>{
  const {id} = req.params;
  const update = req.body;
  const isValid = productServices.validProduct(update);
  if(isValid) return res.status(err422).json(isValid);
  const product = await productServices.updateOne(id,update);
  if (product.err) return res.status(err422).json(product);
  return res.status(statusOk).json(product);
};

const deleteOne = async(req,res)=>{
  const {id} = req.params;
  const product = await productServices.deleteOne(id);
  if (product.err) return res.status(err422).json(product);
  return res.status(statusOk).json(product);
};



module.exports={
  addProducts,getAll,getOne,updateOne,deleteOne
};