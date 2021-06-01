const { ObjectId } = require('bson');
const {uniqueValue, findById} = require('../models/Products');
const nameLenght = 5;
const quantityValue = 0;

const productValidator =   (name,quantity) => {
  if(name.length < nameLenght)  return {err:{
    code:'invalid_data',
    message:'"name" length must be at least 5 characters long'
  }
  };

  if(quantity <= quantityValue)  return {err:{
    code:'invalid_data',
    message:'"quantity" must be larger than or equal to 1'
  }
  };

  if(typeof quantity === 'string')  return {err:{
    code:'invalid_data',
    message:'"quantity" must be a number'
  }
  };
    

  return {};
};


const validateName = async (name) => {
  const validate = await uniqueValue(name);
  if (validate !==null ) return {err:{
    code:'invalid_data',
    message:'Product already exists'
  }
  };

  return {};
};
  
 

module.exports = {
  productValidator,
  validateName,
    
};