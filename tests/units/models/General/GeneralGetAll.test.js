const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Model = require('../../../../models').General;
const { database } = require('../../../../.env').mongodbConnection;

let DBServer;
let connectionMock;
let db;

describe('Generals Model: getAll()', () => {
  before(async () => {
    DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    db = connectionMock.db(database);
    
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    if (connectionMock) connectionMock.close();
    if (DBServer) await DBServer.stop()
  });

  describe('when the collection has no item', () => {
    it('should return an empty array', async () => {
      const resp = await Model.getAll('collection');
      expect(resp).to.be.an('array');
      expect(resp.length).to.be.equal(0);
    });
  });

  describe('when the collection has 3 items', () => {
    beforeEach(async () => {
      await db.collection('collection').insertMany([{ id: 1 },{ id: 2 },{ id: 3 }]);
    });

    afterEach(async () => {
      await db.collection('collection').deleteMany({});
    });

    it('should return an array with 3 objects', async () => {
      const resp = await Model.getAll('collection');
      expect(resp).to.be.an('array');
      expect(resp.length).to.be.equal(3);
      expect(resp[0]).to.be.an('object');
    });
  });
});
