const { 
  getAll,
  insertProduct,
  deleteProduct,
  getbyname, 
} = require('../models/productModel');

const alldocs = async() => await getAll();


const f = 5;
const z = 0;
const insertpdt = async(name, quantity) => { 
  const count = await getbyname(name);
  
  if (name.length < f){
    
    throw({ 
      err:{
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long'
      } 
    });
  }else if( quantity <= z){
    throw (
      { 
        err:{
          code: 'invalid_data',
          message: '"\quantity\" must be larger than or equal to 1'
        } 
      }
    );

  } else if(!Number.isInteger(quantity)) {
    throw (
      { 
        err:{
          code: 'invalid_data',
          message: '"\quantity\" must be a number'
        } 
      }
    );
  }else if(count > z) {
    throw (
      { 
        err:{
          code: 'invalid_data',
          message: 'Product already exists'
        } 
      }
    );
  }else { return await insertProduct(name, quantity);};
  
};


const deleteone = async(id) => {
  if (!id) {
    console.error({ 
      err:{
        code: 'invalid_data',
        message: '"\"id\"" idnão encontrado'
      } 
    });
  }else{return  await deleteProduct(id);}
};


module.exports = {
  alldocs,
  insertpdt,
  deleteone,
};