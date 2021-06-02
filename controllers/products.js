const ProductsService = require('../services/products');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const UNPROCESSABLE = 422;

const create = async (req, res) => {
  const newProduct = req.body;

  ProductsService.create(newProduct)
    .then((response) => {
      res
        .status(STATUS_CREATED)
        .json(response);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(UNPROCESSABLE)
        .json(
          {
            err: {
              code: 'invalid_data',
              message: err.message
            }
          }
        );
    });
};

const read = (_req, res) => {
  ProductsService.read()
    .then(data => res.status(STATUS_OK).json({ products: data }));
};

const readById = async (req, res) => {
  const { id } = req.params;
  
  ProductsService.readById(id)
    .then(data => {
      res.status(STATUS_OK).json(data);
    })
    .catch((err) => {
      console.log(err, 'ops, deu erro');
      res
        .status(UNPROCESSABLE)
        .json(
          {
            err: {
              code: 'invalid_data',
              message: err.message,
            }
          }
        );
    });
};

module.exports = {
  create,
  read,
  readById,
};