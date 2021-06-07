const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Model = require('../../../../models').General;
const { database } = require('../../../../.env').mongodbConnection;

let DBServer;
let connectionMock;
let db;
let id;

describe('Generals Model: insertOne()', () => {
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

  describe('when is passed a "resource" WITH an existing id', () => {
    beforeEach(async () => {
      const { insertedId } = await db.collection('collection').insertOne({ id: 1 });
      id = insertedId;
    });

    it('should return undefined', async () => {
      const resp = await Model.insertOne('collection', { _id: new ObjectId(id) });
      expect(resp).to.be.undefined;
    });
  });

  describe('when is passed a "resource" WITHOUT an existing id', () => {
    it('should return an id', async () => {
      const resp = await Model.insertOne('collection', { id: 1 });
      expect(resp).to.not.be.undefined;
    });
  });
});
