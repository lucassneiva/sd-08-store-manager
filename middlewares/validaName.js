const { getAllProtudos } = require('../services/produtoServices');

const validaName = async (req, res, next) => {
  const nome = req.body.name;
  const CINCO = 5;
  const OBRIGATORIO = 422;

  if (!nome) {
    return res.status(OBRIGATORIO)
      .json({ err: { code: 'invalid_data', message: 'O campo "name" é obrigatório' } });
  }

  if (nome.length < CINCO) {
    return res.status(OBRIGATORIO)
      .json({ err: {
        code: 'invalid_data', message: '"name" length must be at least 5 characters long'
      }});
  }

  const produtos = await getAllProtudos();
  if (!produtos.find((p) => p.name !== nome)) {
    return res.status(OBRIGATORIO)
      .json({ err: {
        code: 'invalid_data', message: 'Product already exists'
      }});
  }

  next();
};

module.exports = validaName;
