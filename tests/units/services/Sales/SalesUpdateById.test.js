const sinon = require('sinon');
const { expect } = require('chai');

const Model = require('../../../../models').General;
const Service = require('../../../../services').Sales;

let _id = 'randomId';

describe('Sales Service: updateById()', () => {
  afterEach(async () => {
    Model.updateById.restore();
  });

  describe('when the resource`s _id does not exist or doesn`t change', () => {
    beforeEach(async () => {
      sinon.stub(Model, 'updateById').resolves(false);
    });
  

    describe('should return { error } with', () => {
      it('error.code === "not_found"', async () => {
        const { error } = await Service.updateById(_id, { id: 1 });
        expect(error.code).to.be.equal('not_found');
      });

      it('error.message defined', async () => {
        const { error } = await Service.updateById(_id, { id: 1 });
        expect(error.message).to.not.be.undefined;
      });
    });
  });

  describe('when the resource`s _id exists and the object is modified', () => {
    beforeEach(() => {
      sinon.stub(Model, 'updateById').resolves(true);
      sinon.stub(Model, 'findById').resolves({ id: 1 });
    });

    afterEach(() => {
      Model.findById.restore();
    });

    it('should return { result } where result is an object', async () => {
      const { result } = await Service.updateById(_id, { id: 1 });
      expect(result).to.be.an('object');
    });
  });
});
