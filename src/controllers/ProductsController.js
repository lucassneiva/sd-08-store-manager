const service = require('../services/ProductsService');
const rescue = require('express-rescue');


const CODE_200 = 200;
const CODE_201 = 201;
const ERROR_CODE_422 = 422;
const ERROR_CODE_404 = 404;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newProduct = await service.create(name, quantity);

    res.status(CODE_201).json(newProduct);
  } catch(e) {
    res.status(ERROR_CODE_422).json( { err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    } );
  }
};

const getAllProducts = rescue(async (_req, res) => {
  const products = await service.getAll();

  res.status(CODE_200).json({ products });
});

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await service.getById(id);  

    res.status(CODE_200).json(result);

  } catch (e) {
    res.status(ERROR_CODE_422).json({err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const result = await service.updateOne(id, name, quantity);

    res.status(CODE_200).json(result);
  } catch (e) {
    res.status(ERROR_CODE_422).json( {err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    } );
  }
};

const deleteProduct = async(req, res) => {
  try {
    const { id } = req.params;
    const notProduct = await service.deleteOne(id);

    res.status(CODE_200).json(notProduct);
  } catch (e) {
    res.status(ERROR_CODE_422).send({err: 
      { 
        code: 'invalid_data',
        message: e.message
      }
    } );
  }
};


module.exports = {
  deleteProduct,
  createProduct, 
  getProductById, 
  getAllProducts,
  updateProduct
};