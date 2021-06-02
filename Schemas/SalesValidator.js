const number = 0;

const salesValidator = async (salesArr) => {
  const data = await salesArr.map(item => item.quantity);
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





module.exports = {
  salesValidator,
    
};