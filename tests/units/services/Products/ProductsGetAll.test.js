const sinon = require('sinon');
const { expect } = require('chai');

const Model = require('../../../../models').General;
const Service = require('../../../../services').Products;

describe('Products Service: getAll()', () => {
  afterEach(async () => {
    Model.getAll.restore();
  });

  describe('when the collection has no item', () => {
    beforeEach(async () => {
      sinon.stub(Model, 'getAll').resolves([]);
    });
  

    it('should return object with a key result with an empty array', async () => {
      const resp = await Service.getAll();
      expect(resp.result).to.be.an('array');
      expect(resp.result.length).to.be.equal(0);
    });
  });

  describe('when the collection has 3 items', () => {
    beforeEach(() => {
      sinon.stub(Model, 'getAll').resolves([{ id: 1 },{ id: 2 },{ id: 3 }]);
    });

    it('should return an object with key result with 3 items', async () => {
      const resp = await Service.getAll();
      expect(resp.result).to.be.an('array');
      expect(resp.result.length).to.be.equal(3);
    });
  });
});
