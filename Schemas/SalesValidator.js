const { ObjectId } = require('bson');
const number = 0;
const {uniqueValue, findById} = require('../models/Products');

const salesValidator =   (salesArr) => {
  const data = salesArr.map(item => item.quantity);


  if(data.some(item => item <= number))  return {err:{
    code:'invalid_data',
    message:'Wrong product ID or invalid quantity'
  }
  };

  if(data.some(item => typeof item === 'string'))  return {err:{
    code:'invalid_data',
    message:'Wrong product ID or invalid quantity'
  }
  };

  

  return {};
};


const validadeStock  = (salesArr) =>  {
  const mapped = salesArr.map(item => item.productId);
  console.log(mapped);

}; 

module.exports = {
  salesValidator,
  validadeStock
};