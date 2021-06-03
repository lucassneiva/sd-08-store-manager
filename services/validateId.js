const ERRO_INVALID_DATA = 422;
const {ObjectId} = require('mongodb');
const read = require('../models/read');
const  validateId = async (id, res , msgError, errorCode) => {
  console.log('1 valida ID ');
  console.log(ObjectId.isValid(id));
  msgError = msgError || {err:
    { code: 'invalid_data', 
      message: 'Wrong id format' },};
  errorCode = errorCode || ERRO_INVALID_DATA;
  if (!ObjectId.isValid(id)) {
    return res.status(errorCode).json(msgError);
  };
  let producRead;
  console.log('3 valida ID '+ producRead);
  producRead = await read.findById('products',id); 
  console.log('4 valida ID '+ producRead);
  console.log(producRead);
  if ( producRead.length < 1) {
    return res.status(errorCode).json(msgError);
  }
  return {};
};

module.exports = validateId;