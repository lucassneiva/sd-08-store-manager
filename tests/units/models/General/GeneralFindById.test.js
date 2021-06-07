const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Model = require('../../../../models').General;
const { database } = require('../../../../.env').mongodbConnection;

let DBServer;
let connectionMock;
let db;
let _id;

describe('Generals Model: findById()', () => {
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

  describe('when the resource looked up does not exist', () => {
    it('should return null', async () => {
      const resp = await Model.findById('collection', new ObjectId());
      expect(resp).to.be.null;
    });
  });

  describe('when the resource looked up exists', () => {
    beforeEach(async () => {
      const { insertedId } = await db.collection('collection').insertOne({ id: 1 });
      _id = insertedId;
    });

    afterEach(async () => {
      await db.collection('collection').deleteMany({});
    });

    it('should return the resource object', async () => {
      const resp = await Model.findById('collection', new ObjectId(_id));
      expect(resp).to.be.an('object');
      expect(resp._id).to.be.eql(_id);
    });
  });
});
