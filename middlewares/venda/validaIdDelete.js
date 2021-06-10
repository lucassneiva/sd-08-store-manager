const { getByIdVendaModel } = require('../../models/venda/vendasModel');

const validaIdDelete = async (req, _res, next) => {
  const {id} = req.params;
  const QDD = 422;
  const resp = await getByIdVendaModel(id);
  if (!resp) {
    next({ status: QDD, message: 'Wrong sale ID format' });
  }

  next();
};

module.exports = validaIdDelete;
