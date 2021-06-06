const salesService= require('../services/salesService');
const httpStatusCodeCreated = 201;
const httpStatusCodeErro = 422;
const httpStatusCodeSucess = 200;

const cadastraVenda = async (req, res) => {
  try {
    const produtoVendido = req.body;
    const vendas = await salesService.cadastraVenda(produtoVendido);
    res.status(httpStatusCodeSucess).json(vendas);
  } catch (error) {
    res.status(httpStatusCodeErro).json({
      err: {
        code: 'invalid_data',
        message: error.message
      }
    });
  }
};

module.exports = {
  cadastraVenda,
};