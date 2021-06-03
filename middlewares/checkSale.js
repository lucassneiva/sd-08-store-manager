const { error } = require('../services/responseType');
const { ObjectId } = require('mongodb');
const zero = 0;

const checkSale = (req, res) => {
  const {quantity, productId} = req.body;
  if(!ObjectId(productId) || quantity <= zero || typeof quantity !== 'number'){
    return res.status(error).json({err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }});
  }
};

module.exports = {
  checkSale
};
