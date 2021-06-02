const MIN_NAME_LENGTH = 5;
const ERRO_INVALID_DATA = 422;
const MINUS_ONE = -1;
const  validateName = (name, res, nameslist) =>{
  console.log('validação nome 1 -1=?' + nameslist.indexOf(name));
  if (nameslist.indexOf(name) !== MINUS_ONE) {
    return res.status(ERRO_INVALID_DATA).json({err:
        { code: 'invalid_data', 
          message: 'Product already exists' },});
  }
  console.log('validação nome 2 name.length=' + name.length);
  if (name.length < MIN_NAME_LENGTH) {
    return res.status(ERRO_INVALID_DATA).json({err:
         { code: 'invalid_data', 
           message: '"name" length must be at least 5 characters long' },});
  }
  console.log('validação nome 3 ');
  return {};
};

module.exports = validateName;
