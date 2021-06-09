const {
  getById,
} = require('../../models/produto/produtosModel');

const {
  cadatraVendaModel,
  getAllVendasModel,
  getByIdVendaModel,
  updateVendasModel,
} = require('../../models/venda/vendasModel');

const cadastraVenda = async (itensSold) => {
  const produtos = itensSold.map((venda) => getById(venda.productId));
  const produto = await Promise.all(produtos);

  if (produto.some((produto) => !produto)) return null;
  const _id = await cadatraVendaModel(itensSold);
  return _id;
};

const getAllVendas = async () => {
  const vendas = await getAllVendasModel();
  return vendas;
};

const getByIdVenda = async ({id}) => {
  const produto = await getByIdVendaModel(id);
  return produto;
};

const updateVendas = async (id, updateSale) => {
  const update = await updateVendasModel(id, updateSale);
  return update;
};

module.exports = {
  cadastraVenda,
  getAllVendas,
  getByIdVenda,
  updateVendas,
};
