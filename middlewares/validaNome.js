const { getByName } = require('../models/produtosModel');

const validaNome = async (req, _res, next) => {
  const nome = req.body.name;
  const CINCO = 5;
  const QDD = 422;
  if (!nome) {
    next({ status: QDD, message: 'O campo "name" é obrigatório' });
  }

  if (nome.length < CINCO) {
    next({ status: QDD, message: '"name" length must be at least 5 characters long' });
  }
  
  const resp = await getByName(nome);
  if (resp !== null) {
    next({ status: QDD, message: 'Product already exists' });
  }

  next();
};

module.exports = validaNome;
