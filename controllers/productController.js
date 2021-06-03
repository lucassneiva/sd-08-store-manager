const productService = require('../services/productService');
const httpStatusCodeCreated = 201;
const httpStatusCodeErro = 422;
const httpStatusCodeSucess = 200;


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

const listarProdutos = async (req, res) => {
  const products = await productService.listarProdutos();
  const retornoProdutos = { products };

  res.status(httpStatusCodeSucess).json(retornoProdutos);
};

const buscarProdutoPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await productService.buscarProdutoPorId(id);
    res.status(httpStatusCodeSucess).json(product);
  } catch (err) {
    res.status(httpStatusCodeErro).json(
      {
        err: {
          code: 'invalid_data',
          message: err.message
        }
      });
    
  }
};

module.exports = { 
  cadastrarProduto,
  listarProdutos,
  buscarProdutoPorId };