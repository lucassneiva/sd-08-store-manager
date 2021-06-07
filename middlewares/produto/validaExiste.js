const { getByName } = require('../../models/produto/produtosModel');

const validaExiste = async (req, _res, next) => {
  const nome = req.body.name;
  const QDD = 422;  
  const resp = await getByName(nome);
  if (resp !== null) {
    next({ status: QDD, message: 'Product already exists' });
  }

  next();
};

module.exports = validaExiste;
