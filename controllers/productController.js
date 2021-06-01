
const productServices = require('../services/productServices');



const addProducts = async(req,res)=>{

  const product = req.body;
  const isValid = productServices.validProduct(product);
  if(isValid) return res.status(422).json(isValid);
  const result = await productServices.addProduct(product);
  if (result.err) return res.status(422).json(result);
  res.status(201).json(result);
};
const getOne = async(req,res)=>{
  const { id } = req.params;
  const result = await productServices.getOne(id);
 
  if (result.err) {
    return res.status(500).json(result);
  }
  return  res.status(200).send(result);
};
const getAll = async(req,res)=>{
  const product = await productServices.getAll();
  return res.status(200).json(product);
};

const updateOne = async(req,res)=>{
  const {id} = req.params;
  const update = req.body;
  const isValid = productServices.validProduct(update);
  if(isValid) return res.status(422).json(isValid);
  const product = await productServices.updateOne(id,update);
  if (product.err) return res.status(422).json(product);
  return res.status(200).json(product);
};


module.exports={
  addProducts,getAll,getOne,updateOne
};