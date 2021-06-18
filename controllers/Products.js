const rescue = require('express-rescue');
const Products = require('../services/Products');
const SchemaProducts = require('../schemas/schemaProducts');

const {CREATED}=require('../services/variableErrors');

const createProduct= rescue(async(req,res,next)=>{

  const {error}= await SchemaProducts.validate(req.body);
  if(error) return next(error);

  const {name,quantity}=req.body;
  const product = await Products.createProduct({name,quantity});
  
  if(product.error) return next(product.error);
  res.status(CREATED).json(product);


});

module.exports = {
  createProduct
};
