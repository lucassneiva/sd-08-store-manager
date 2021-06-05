const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectID, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Connection = require('../../models/connection');
const ProductModel = require('../../models/productModel');
const dataBaseFake = require('../data');
const { stub } = require('sinon');

describe('Teste a connection', async () => {
    const { connectionDb } = Connection;

    const DBServer = new MongoMemoryServer();
    const connDb = { url: '', db: '' };
    let connectionMock;
    before(async () => {
      connDb.url = await DBServer.getUri();
      connDb.db = await DBServer.getDbName();

      connectionMock = await MongoClient.connect(connDb.url,  {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      sinon.restore();
      DBServer.stop();
    })

    it('TESTE SE A CONNECTION É UMA "function"', async () => {
      expect('function').to.be.equal(typeof connectionDb);
    });
    
    it('TESTE SE A URL NÃO FOR UMA STRING', async () => {
      const result = await connectionDb(null, 'StoreManager')
      expect('URL NÃO É UMA STRING!!!').to.be.equal(result)
    });
});

