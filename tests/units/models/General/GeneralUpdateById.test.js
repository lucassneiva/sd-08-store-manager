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

describe('Generals Model: updateById()', () => {
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

  describe('when the resource`s _id does not exist', () => {
    it('should return false', async () => {
      const resp = await Model.updateById('collection', new ObjectId(), { id: 1 });
      expect(resp).to.be.false;
    });
  });

  describe('when the resource`s _id exists', () => {
    beforeEach(async () => {
      const { insertedId } = await db.collection('collection').insertOne({ id: 1 });
      _id = insertedId;
    });

    afterEach(async () => {
      await db.collection('collection').deleteMany({});
    });

    describe('when the resource is not modified', () => {
      it('should return false', async () => {
        const resp = await Model.updateById('collection', new ObjectId(_id), { id: 1 });
        expect(resp).to.be.false;
      });
    });

    describe('when the resource is modified', () => {
      it('should return true', async () => {
        const resp = await Model.updateById('collection', new ObjectId(_id), { id: 2 });
        expect(resp).to.be.true;
      });
    });

  });
});
