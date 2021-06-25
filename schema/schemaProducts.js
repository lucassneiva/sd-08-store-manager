module.exports = async(name, quantity) => {
  const FIVE = 5;
  const code = 422;
  
  if(!name || typeof name !== 'string' || name.length < FIVE){
    return {
      code,
      'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      }
    };
  }
  if( quantity < 1){
    return {
      code,
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1'
      }
    };
  }
  if(typeof quantity !== 'number'){
    return {
      code,
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be a number'
      }
    };
  }
  return {};
};