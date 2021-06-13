// const array = [1, 2, 3, 4, 5];
// const x = array
//   .reduce((acc, curr, i, arr) => {
//     if(i === 2) arr.splice(1);  // eject early
//     return acc += curr;
//   }, 0);
// console.log('x: ', x);  // x:  99195



  

  
// // const result = arrDataSales.reduce(async(promiseAcc, cur, index) =>{

// //   const acc = await promiseAcc;

// //   // const { productId }  = cur;

// //   // const{ error: productNotFound} = await productsModel.getById(productId);
    
// //   // if(!productNotFound){
// //   //   console.log('oi');
    
// //   // }
// //   if(!index){
// //     const { insertedId } = await salesModel.create({itensSold: [cur]});
// //     acc._id = insertedId;
// //     acc.itensSold.push(cur);
// //     return acc;
// //   }
// //   await salesModel.update(acc._id, cur);
// //   acc.itensSold.push(cur);

// //   return acc;

// // }, Promise.resolve({_id: '', itensSold: []}));

// // return result;



// // const salesModel = require('../models/salesModel');
// // const productsModel = require('../models/productsModel');

// // const create = async (itensSold)=>{
// //   const checkExistProduct = await itensSold
// //     .forEach( async ({productId}) => productsModel.getById(productId).then((data) => console.log(data, 'foi aqui')));

// //   // if(!checkExistProduct){
// //   //   return 'vai tomar no seu cu';
// //   // }



// //   const { insertedId } = await salesModel.create({itensSold});
// //   return {_id:insertedId, itensSold};
// // };

// // const getAll = ()=>{
// //   return salesModel.getAll();
// // };

// // // getAll().then(console.log);

// // module.exports ={
// //   create,
// //   getAll,
// // };