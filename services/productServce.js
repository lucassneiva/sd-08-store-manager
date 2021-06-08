const { getAll, insertProduct, deleteProduct } = require('../models/productModel');

const alldocs = async() => await getAll();


const f = 5;
const z = 0;
const insertpdt = async(name, quantity) => { 
 
  if (name.length < f){
    return ({ 
      err:{
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long'
      } 
    });
  }else if( quantity <= z){
    return (
      { 
        err:{
          code: 'invalid_data',
          message: '"\quantity\" must be larger than or equal to 1'
        } 
      }
    );

  } else { return await insertProduct(name, quantity);};
  
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