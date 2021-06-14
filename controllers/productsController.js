const ProductsService = require('../services/productsService');

const STATUS_ERROR = 500;
const STATUS_422 = 422;
const STATUS_201 = 201;

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


module.exports = {
  create
};
