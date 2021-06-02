const service = require('../service/productService');
const fail = 422;
const success = 201;
const success2 = 200;

const createP = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    // console.log(name);
    const addedProduct = await service.createProduct(name, quantity);
    res.status(success).json(addedProduct);
  } catch (err) {
    res.status(fail).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      },
    });
  }
};

const getAllProducts = async (_req, res) => {
  const products = await service.getAllProducts();
  res.status(success2).json({ products: products });
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.findById(id);
    res.status(success2).json(product);
  } catch (err) {
    res.status(fail).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      }
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const productToUpdate = await service.updateProduct(id, name, quantity);
    res.status(success2).json(productToUpdate);
  } catch (err) {
    res.status(fail).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      },
    });
  }
};

module.exports = { createP, getAllProducts, findById, updateProduct };
