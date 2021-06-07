const {
  getById,
} = require('../../models/produto/produtosModel');

const {
  cadatraVendaModel,
} = require('../../models/venda/vendasModel');

const cadastraVenda = async (itensSold) => {
  const produtos = itensSold.map((venda) => getById(venda.productId));
  const produto = await Promise.all(produtos);

  if (produto.some((produto) => !produto)) return null;
  const _id = await cadatraVendaModel(itensSold);
  return { _id, itensSold };
};

module.exports = {
  cadastraVenda,
};
