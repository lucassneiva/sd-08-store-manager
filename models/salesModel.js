const { ObjectId } = require('mongodb');
const conn = require('./conn');
const {getAll, update} = require('./productModel');
const rescue = require('rescue');





const allsale = async() => { 
  const sales = await conn().then( db => db.collection('sales').find().toArray());
  console.log('model13', sales);
  return sales;
};  


const oneprodu = async(id) => {
  const one = await conn().then(db => db.collection('products').findOne(ObjectId(id)));
  return one;
  
};

const getsaleby = async(id) => {
  const onSale = await conn().then(db => db.collection('sales').findOne(ObjectId(id)));
  return onSale;
  
};

const updatequantity = async(id, newvalue) => 
  conn().then( async (db) => { 
    const result = await db.collection('products').updateOne(
      {_id: ObjectId(id)}, {$set:{ quantity: newvalue }}
    );
    //console.log('smodel34', result);
    return result;
  });
;
 


const decrementpdt = async(arrvenda) => {
  const pfromreq = arrvenda.map((p)=>{return p;});
  const pfromdb = await getAll();
  pfromreq.forEach(async({_id, quantity}, i)=>{
    if (_id == pfromdb[i]._id){
      let newvalue = pfromdb[i].quantity - quantity;
      await updatequantity(_id, newvalue);
      console.log('smod47',newvalue);
      
    }
  });
  console.log('smodel51', 'req:',pfromreq , 'banco:', pfromdb);
};
// if(newvalue > pfromdb[i].quantity){return 'quantity grether then stock'}


const newsale =async(arrvenda)=>{
  return(
    conn().then( 
      async(db)=>{
        const inserted = await db.collection('sales').insertOne(
          { itensSold: arrvenda });
        // console.log('result em model:', inserted.ops[0]);
        return(inserted.ops[0]);
      }
    ).then((ins) =>{ return ins; })
  );
  
};


const updatesale = async(id, body) => 
  conn().then( async (db) => { 
    const result = await db.collection('sales').updateOne(
      {_id: ObjectId(id)}, {$set:{itensSold: body }});
    return await (getsaleby(id));
  });
;


const deletesale = async(id) => {
  
  return conn().then(
    async (db) => await db.collection('sales').deleteOne({_id:ObjectId(id)})
  );
      
}; 





module.exports = {
  allsale,
  newsale,
  deletesale,
  getsaleby,
  updatesale,
  decrementpdt,
  //onesalebyid,
};