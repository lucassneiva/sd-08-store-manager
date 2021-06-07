const productService = require('../services/productService');
const status = require('../constants/statusCode');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAll();
    res.status(status.OK).json({ products: products });
  } catch (err) {
    console.error(err);
    res.status(status.INTERNAL_SERVER_ERROR)
      .send({ message: 'erro ao solicitar requisição' });
  }
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(id);

  if (product !== null) {
    return res.status(status.OK).send(product);
  } else {
    res.status(status.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productService.add(name, quantity);
  if (product !== null) {
    return res.status(status.CREATED).send(product);
  } else {
    res.status(status.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const product = await productService.update(id, name, quantity);
    res.status(status.OK).send(product);
  } catch (err) {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'erro ao solicitar requisição' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productService.exclude(id);
  if (product !== null) {
    return res.status(status.OK).send(product);
  } else {
    res.status(status.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
