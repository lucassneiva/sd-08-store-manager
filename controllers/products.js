const ProductsService = require('../services/products');

const STATUS_OK = 201;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = {
    name,
    quantity,
  };

  const productInserted = await ProductsService
    .create(newProduct);

  if(productInserted.errorStatus) {
    return res
      .status(productInserted.errorStatus)
      .json(productInserted.json);
  }

  return res
    .status(STATUS_OK)
    .json(productInserted);
};

const read = (_req, res) => {
  ProductsService.read()
    .then(data => res.status(STATUS_OK).json(data));
};

module.exports = {
  create,
  read,
};