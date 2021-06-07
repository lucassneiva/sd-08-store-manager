const productModel = require('../models/productModel');

const allproducts = async(req, res, _next) => {
  try {
    const status = 200;
    const results = await productModel.getAll();
    res.status(status).send(results); 
  } catch (error) {console.error(error);
    const statuserr = 500;
    res.status(statuserr).json({message: error.message});

  }
};

const insertProduct = async (req, res, next) => {
  try {
    const status = 200;
    const results = await productModel.insertProduct();
    res.status(status).send(results); 
  } catch (error) {console.error(error);
    const statuserr = 500;
    res.status(statuserr).json({message: error.message});

  }

};

module.exports = {
  allproducts,
  insertProduct,
};