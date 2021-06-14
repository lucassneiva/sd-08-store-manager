const { error } = require('../services/Responses');
const zero = 0;

const saleCheck = (req, res) => {
  const { body } = req;
  body.forEach(({quantity}) => {
    if(quantity <= zero || typeof quantity !== 'number'){
      return res.status(error).json({err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }});
    }
  });
};

module.exports = {
  saleCheck
};