const { error } = require('../services/Responses');

const five = 5;
const zero = 0;

const productCheck = (req, res) => {
  const { name, quantity } = req.body;
  if(!name || name.length < five) {
    return res.status(error).json({err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }});
  };
  if(quantity <= zero){
    return res.status(error).json({err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }});
  }
  if(typeof quantity !== 'number'){
    return res.status(error).json({err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }});
  }
};
module.exports = productCheck;