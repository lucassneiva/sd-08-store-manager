const ERRO_INVALID_DATA = 422;
const {ObjectId} = require('mongodb');
const  validateId = (id, res , msgError, erroCode) => {
  msgError = msgError || {err:
    { code: 'invalid_data', 
      message: 'Wrong id format' },};
  erroCode = erroCode || ERRO_INVALID_DATA;
  console.log('1 valida ID '+id);
  console.log(ObjectId.isValid(id));
  if (!ObjectId.isValid(id)) {
    return res.status(erroCode).json(msgError);
  };
  return {};
};

module.exports = validateId;