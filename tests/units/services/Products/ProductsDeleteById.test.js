const sinon = require('sinon');
const { expect } = require('chai');

const Model = require('../../../../models').General;
const Service = require('../../../../services').Products;

describe('Products Service: deleteById()', () => {
  afterEach(async () => {
    Model.deleteById.restore();
  });

  describe('when the resource`s _id does not exist', () => {
    beforeEach(async () => {
      sinon.stub(Model, 'deleteById').resolves(false);
    });
  

    describe('should return { error } with', () => {
      it('error.code === "not_found"', async () => {
        const { error } = await Service.deleteById();
        expect(error.code).to.be.equal('not_found');
      });

      it('error.message defined', async () => {
        const { error } = await Service.deleteById();
        expect(error.message).to.not.be.undefined;
      });
    });
  });

  describe('when the resource`s _id exists', () => {
    beforeEach(() => {
      sinon.stub(Model, 'deleteById').resolves(true);
    });

    it('should return { result } where result is an object', async () => {
      const { result } = await Service.deleteById();
      expect(result).to.be.an('object');
    });
  });
});
