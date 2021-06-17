const ProductsService = require('../services/productsService');
const ProductsModel = require('../models/productsModel');

const STATUS_422 = 422;
const STATUS_201 = 201;
const STATUS_200 = 200;
const STATUS_500 = 500;
const STATUS_404 = 404;

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
    return res.status(STATUS_500).json({message: error.message});
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
    return res.status(STATUS_500).json({message: error.message});
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const product = await ProductsModel.getById(id);
    if(product) return res.status(STATUS_200).json(product);
    res.status(STATUS_404).json({message: 'Product not found'});
  } catch (_error) {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
}

async function update(req, res) {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const product = await ProductsService.update(id, name, quantity);
    if(product.error) return res.status(STATUS_422).json({err: {
      code: 'invalid_data',
      message: product.message
    }});
    res.status(STATUS_200).json(product);
  } catch (error) {
    res.status(STATUS_500).json({err: {
      code: 500,
      message: 'Internal error'
    }});
  }
}

async function exclude(req, res) {
  try {
    const { id } = req.params;
    const { value } = await ProductsModel.exclude(id);
    if(!value) return res.status(STATUS_422).json({message: 'Product not found'});
    res.status(STATUS_200).json(value);
  } catch (error) {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
}


module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude
};
