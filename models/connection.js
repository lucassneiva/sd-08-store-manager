require('dotenv').config();
const { MongoClient } = require('mongodb');
const saveMe = require('../utils/saveMe');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let conn = null;
let db = null;

const connection = saveMe(async () => {
  if (conn) return db;

  conn = await MongoClient.connect(
    process.env.MONGO_DB_URL,
    OPTIONS
  );

  db = await conn.db(process.env.DB_NAME);

  return db;
});

// Estava PUTO porque não descobria o motivo de um teste estar
// contaminando o DB em memória do outro, quando lembrei que há
// um fucking singleton no connection :face_palm: :poop: :boom:
// por enquanto vou resolver isso criando esta uma função que pode
// ser usada pra fechar a conexão durante os testes e "resetar" o
// singleton.
const close = saveMe(async () => {
  // Algumas funções da camada de modelo (por exemplo, getById) retornam 
  // antes de abrir a conexão com o BD, como executamos o close entre os testes
  // é necessário checar se há uma conexão
  if (conn) {
    await conn.close();
    db = null;
    conn = null;
  }
});

module.exports = {
  connection,
  close
};
