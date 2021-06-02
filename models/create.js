const connection = require('./connection');
const create = async (collection, data  ) => {
  console.log('criando ' + data);
  const result = await  connection()
    .then((db) =>  db.collection(collection).insertOne(data ));
  if (!result) return null;
  console.log('criado');
  console.log(result.ops);
  return result.ops;
};

module.exports = create;


// const connection = require('./connection');
// const create = async (collection, data , err , docsInserted) => {
//   console.log('criando ' + data);
//   const result = await  connection()
//     .then((db) =>  db.collection(collection).insertOne(data , function(err,docsInserted)));
//   if (!result) return null;
//   console.log('criado');
//   return result;
// };

// module.exports = create;