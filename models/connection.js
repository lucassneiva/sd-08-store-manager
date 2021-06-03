// Importamos o driver do MongoDB.
const { MongoClient } = require('mongodb');



// Armazenamos as configurações de conexão em uma constante para
// facilitar a leitura do código.
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// A string de conexão com o banco também é armazenada em uma constante
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';

// Criamos uma variável para realizar "cache" da conexão
let db = null;

// Método que cria uma nova conexão ou retorna a existente
const connection = () =>
// Usamos um ternário para verificar se já temos uma conexão
// e decidir o que retornar
  (db
  // Se tivermos, a colocamos dentro de uma Promise já resolvida, utilizando `Promise.resolve`
    ? Promise.resolve(db)
  // Caso ainda não tenhamos, criamos uma nova conexão
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
      // Uma vez com a conexão aberta, a armazenamos na variável `db`
        db = conn.db('StoreManager');
        // Definimos `db` como o resultado da Promise, que é retornada por `connection()`
        return db;
      }));

module.exports = connection;
