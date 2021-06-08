const productsServices = require('../services/productsServices');
const ERROR_CODE = 422;
const ERROR_OK = 200;

const insert = async (req, res) => {
  const { name, quantity } = req.body;

  const body = await productsServices.insert(name, quantity);

  if(body.err) return res.status(body.status).json(body);

  return res.status(body.status).json(body.data);
};

const findByID = async (req, res) => {
  const { id } = req.params;
  const data = await productsServices.findById(id);
  console.log(data)
  if(!data) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Wrong id format' } });

  return res.status(ERROR_OK).json(data);
};

const getAll = async (_req, res) => {
  const data = await productsServices.getAll();

  if(!data) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Something went wrong' } });

  return res.status(ERROR_OK).json(data);
};

module.exports = {
  insert,
  findByID,
  getAll
};
