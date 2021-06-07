const sinon = require('sinon');
const { expect } = require('chai');

const Model = require('../../../../models').General;
const Service = require('../../../../services').Products;

let _id = 'randomId'; 

describe('Products Service: findById()', () => {
  afterEach(async () => {
    Model.findById.restore();
  });

  describe('when the resource looked up does not exist', () => {
    beforeEach(async () => {
      sinon.stub(Model, 'findById').resolves(null);
    });
  

    describe('should return { error } with', () => {
      it('error.code === "not_found"', async () => {
        const { error } = await Service.findById(_id);
        expect(error.code).to.be.equal('not_found');
      });

      it('error.message defined', async () => {
        const { error } = await Service.findById(_id);
        expect(error.message).to.not.be.undefined;
      });
    });
  });

  describe('when the resource looked up exists', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findById').resolves({ id: 1 });
    });

    it('should return { result } where result is an object', async () => {
      const { result } = await Service.findById(_id);
      expect(result).to.be.an('object');
    });
  });
});
