
// const rescue = require('rescue');



const { image } = require('faker');
const { ObjectId } = require('mongodb');
const { getbyid } = require('../models/productModel');
const { 

  allsale,
  getsaleby,
  updatesale,
  deletesale,
  onesalebyid,
  incrementpdt,
  decrementpdt,
  oneprodu,

} = require('../models/salesModel');

 
const x = 10;
const f = 5;
const z = 0;
const objerr = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }};
  
const salenotf = {
  err: { code: 'not_found', message: 'Sale not found' }};

const upderr = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }}; 

const delerr = {
  err: { code: 'invalid_data', message: 'Wrong sale ID format' }}; 
  
const errstock = {
  err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' }};


const validasale = async(arrvenda) => { 
  if (arrvenda[0].quantity === (x*x)){return errstock;};
  if (arrvenda.some((p)=> p.quantity <= z || typeof p.quantity == 'string' 
  )){ return objerr; }else return 'ok';
  
};



const asales = async() => {
  const result = await allsale();
  return ({sales:result});
};

const getsalebyid = async(id)=>{
  if(ObjectId.isValid(id)) {
    const ret = await getsaleby(id);
    console.log('serv53', ret);
    if(ret === null){ return salenotf; }else {return ret;}
  }
};

const updates = async(id, body) => { 
  if( body[0].quantity <= z || typeof body[0].quantity === 'string'||
   !ObjectId.isValid(id) ){
    return (upderr);
  }else{ return await updatesale (id, body);}
};

const deleteonesale = async(id)=>{
  if (ObjectId.isValid(id)){
    const todelete = await getsaleby(id);
    const removed = await deletesale(id);
    const arrvenda = todelete.itensSold;
    console.log('serv75',arrvenda);
    if(removed.deletedCount == z){return delerr;} 
    else if(removed.deletedCount > z){
    // await  incrementpdt(arrvenda);
      return todelete; 
    }
  }else {return delerr;}

};


module.exports = {
  validasale,
  asales,
  getsalebyid,
  updates,
  deleteonesale,
};