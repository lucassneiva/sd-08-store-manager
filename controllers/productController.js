const productService = require('../services/productService');
const httpStatusCodeCreated = 201;
const httpStatusCodeErro = 422;

const cadastrarProduto = async (req, res) => {
  try {
    const produto = req.body;
    
    const result = await productService.criar(produto);
    res.status(httpStatusCodeCreated).json(result);
  } catch(err) {
    res.status(httpStatusCodeErro).json(
      {
        err: {
          code: 'invalid_data',
          message: err.message
        }
      }
    );
  }
};

module.exports = { cadastrarProduto };