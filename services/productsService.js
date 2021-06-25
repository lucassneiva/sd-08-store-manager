const productsModel = require('../models/productsModel');
const schemaProducts = require('../schema/schemaProducts');

const validateProducts = [
  async(req, res, next) => {
    const code = 422;
    const { name }  = req.body;
      
    const productList = await productsModel.getAll();
    const productExist = productList.find((product) => product.name === name);
      
    if(productExist){
      res.status(code).json({
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        }
      });
    }
    next();
  },
  async(req, res, next) => {
    const {name, quantity} = req.body;


    const verifySchema = await schemaProducts(name, quantity);
    if(verifySchema.err) {
      return res.status(verifySchema.code).json({err: verifySchema.err});
    }
    next();
  }
];



module.exports = {
  validateProducts,
};