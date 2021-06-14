const ProductsService = require('../services/productsService');
const ProductsModel = require('../models/productsModel');

const STATUS_ERROR = 500;
const STATUS_422 = 422;
const STATUS_201 = 201;
const STATUS_200 = 200;

async function create(req, res) {
  try {
    const newProduct = await ProductsService.create(req.body);
    if(newProduct.error) return res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: newProduct.message
      }
    });

    res.status(STATUS_201).json(newProduct);
  } catch (error) {
    return res.status(STATUS_ERROR).json({message: error.message});
  }
}

async function getAll(_req, res) {
  try {
    const products = await ProductsModel.getAll();
    const formatResponse = {
      products: [...products],
    };
    res.status(STATUS_200).json(formatResponse);
  } catch (error) {
    return res.status(STATUS_ERROR).json({message: error.message});
  }
}


module.exports = {
  create,
  getAll
};
