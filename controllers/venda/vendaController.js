const rescue = require('express-rescue');

const DOO = 200;
const QOQ = 404;

const {
  cadastraVenda,
  getAllVendas,
  getByIdVenda,
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

module.exports = {
  criarVenda,
  todasVendas,
  idVenda,
};
