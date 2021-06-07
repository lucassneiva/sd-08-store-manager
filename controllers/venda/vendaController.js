const rescue = require('express-rescue');

const DOO = 200;

const {
  cadastraVenda
} = require('../../services/venda/vendaServices');

const criarVenda = rescue(async (req, res) => {
  const itensSold = req.body;
  console.log(itensSold);
  const novaVenda = await cadastraVenda(itensSold);
  res.status(DOO).json(novaVenda);
});

module.exports = {
  criarVenda,
};
