const sinon = require('sinon');
const { expect } = require('chai');

const Model = require('../../../../models').General;
const Service = require('../../../../services').Products;

let _id = 'randomId'; 

describe('Products Service: insertOne()', () => {
  afterEach(async () => {
    Model.insertOne.restore();
  });
  
  describe('when is passed a "resource" WITH an existing id', () => {
    beforeEach(async () => {
      sinon.stub(Model, 'insertOne').resolves(undefined);
    });

    describe('should return { error } with', () => {
      it('error.code === "already_exists"', async () => {
        const { error } = await Service.insertOne(_id);
        expect(error.code).to.be.equal('already_exists');
      });

      it('error.message defined', async () => {
        const { error } = await Service.insertOne(_id);
        expect(error.message).to.not.be.undefined;
      });
    });
  });

  describe('when is passed a "resource" WITHOUT an existing id', () => {
    beforeEach(() => {
      sinon.stub(Model, 'insertOne').resolves('id');
    });

    it('should return { result } where result is an object', async () => {
      const { result } = await Service.insertOne(_id);
      expect(result).to.be.an('object');
    });
  });
});
