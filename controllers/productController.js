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

const atualizarProdutoPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const produto = req.body;
    const novosDadosProduto = {
      id,
      ...produto
    };
    const produtoAtualizado =
    await productService.atualizarProdutoPorId(novosDadosProduto);
    res.status(httpStatusCodeSucess).json(produtoAtualizado);
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
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// 
const deletarProdutoPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const deleteProduto = await productService.deletarProdutoPorId(id);
    res.status(httpStatusCodeSucess).json(deleteProduto);
  } catch (err) {
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

module.exports = { 
  cadastrarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProdutoPorId,
  deletarProdutoPorId,
};