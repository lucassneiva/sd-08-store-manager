const rescue = require('express-rescue');

const DOO = 200;

const {
  cadastraVenda,
  getAllVendas,
  getByIdVenda,
  updateVendas,
  deleteVendas,
} = require('../../services/venda/vendaServices');

const criarVenda = rescue(async (req, res) => {
  const itensSold = req.body;
  const novaVenda = await cadastraVenda(itensSold);
  res.status(DOO).json(novaVenda);
});

const todasVendas = rescue(async (_req, res) => {
  const sales = await getAllVendas();
  res.status(DOO).json({ sales });
});

const idVenda = rescue(async (req, res) => {
  const produto = await getByIdVenda(req.params);
  res.status(DOO).json(produto);
});

const updateVenda = rescue(async (req, res) => {
  const { id } = req.params;
  const updateSale = req.body;
  const update = await updateVendas(id, updateSale);
  res.status(DOO).json(update);
});

const deleteVenda = rescue(async (req, res) => {
  const { id } = req.params;
  const deleteSale = await deleteVendas(id);
  res.status(DOO).json(deleteSale);
});

module.exports = {
  criarVenda,
  todasVendas,
  idVenda,
  updateVenda,
  deleteVenda,
};
