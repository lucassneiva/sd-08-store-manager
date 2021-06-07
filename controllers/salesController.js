const salesService= require('../services/salesService');
const httpStatusCodeCreated = 201;
const httpStatusCodeErro = 422;
const httpStatusCodeSucess = 200;
const httpStatusCodeNotFound = 404;

const cadastraVenda = async (req, res) => {
  try {
    const produtoVendido = req.body;
    const vendas = await salesService.cadastraVenda(produtoVendido);
    res.status(httpStatusCodeSucess).json(vendas);
  } catch (err) {
    res.status(httpStatusCodeErro).json({
      err: {
        code: 'invalid_data',
        message: err.message
      }
    });
  }
};

const listarVendas = async (req, res) => {
  const vendas = await salesService.listarVendas();
  res.status(httpStatusCodeSucess).json({ sales: vendas });
};

const buscarVendaPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const venda = await salesService.buscarVendaPorId(id);
    res.status(httpStatusCodeSucess).json(venda);
  } catch (err) {
    res.status(httpStatusCodeNotFound).json(
      {
        err: {
          code: 'not_found',
          message: err.message
        }
      });
    
  }
};

const atualizarVendas = async (req, res) => {
  try {
    const itensSold = req.body;
    const { id } = req.params;
    const sale = {id, itensSold};
    const vendaAtualizada = await salesService.atualizarVendas(sale);
    res.status(httpStatusCodeSucess).json(vendaAtualizada);
  } catch (err) {
    res.status(httpStatusCodeErro).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      }
    });
  }
};

const deletarVendaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const deletarVenda = await salesService.deletarVendaPorId(id);
    res.status(httpStatusCodeSucess).json(deletarVenda);
  } catch (err) {
    res.status(httpStatusCodeErro).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      }
    });
  }
};


module.exports = {
  cadastraVenda,
  listarVendas,
  buscarVendaPorId,
  atualizarVendas,
  deletarVendaPorId,
};