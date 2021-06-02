const ZERO = 0;
const ERRO_INVALID_DATA = 422;
const  validateQuantity = (quantity, res) =>{
  console.log('validação quantidade 1  is number ?'+typeof quantity);
  // console.log(typeof  quantity);
  if (typeof quantity !== 'number') {
    return res.status(ERRO_INVALID_DATA).json({err:
        { code: 'invalid_data', 
          message: '"quantity" must be a number' },});
  }
  console.log('validação quantidade 2 0<?' + quantity );
  if (quantity <= ZERO) {
    return res.status(ERRO_INVALID_DATA).json({err:
         { code: 'invalid_data', 
           message: '"quantity" must be larger than or equal to 1' },});
  }
  console.log('validação quantidade 3');
  return {};
};

module.exports = validateQuantity;