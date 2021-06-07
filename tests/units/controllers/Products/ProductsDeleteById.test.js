const sinon = require('sinon');
const { expect } = require('chai');

const Controller = require('../../../../controllers').Products;
const Service = require('../../../../services').Products;

describe('Products controller: deleteById()', () => {
  const req = {};
  const res = {};
  const next = sinon.stub().returns();
  let result;
  let error;

  before(() => {
    req.params = { id: 'id' };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(undefined);
  });
  
  describe('when the Service throws an error', () => {
    before(() => {
      error = new Error('Server error');
      sinon.stub(Service, 'deleteById').throws(error);
    });

    after(() => {
      Service.deleteById.restore();
    });

    it('should call next with the error', async () => {
      await Controller.deleteById(req, res, next);

      expect(next.calledOnceWith({ code: 'internal_error', message: error.message })).to.be.true;
    });

  });

  describe('when the Service resolves { error }', () => {
    before(() => {
      error = { code: 'not_found', message: 'error message' };
      sinon.stub(Service, 'deleteById').resolves({ error });
    });

    after(() => {
      Service.deleteById.restore();
    });

    it('should call Service.deleteById with "id"', async () => {
      await Controller.deleteById(req, res, next);

      expect(Service.deleteById.calledOnceWith('id')).to.be.true;
    });

    it('should call once next error', async () => {
      await Controller.deleteById(req, res, next);

      expect(next.callCount).to.be.equals(3);
      expect(next.calledWith(error)).to.be.true;
    });
  });

  describe('when the Service resolves { result }', () => {
    before(() => {
      result = { id: 1};
      sinon.stub(Service, 'deleteById').resolves({ result });
    });

    after(() => {
      Service.deleteById.restore();
    });

    it('should call Service.deleteById with "id"', async () => {
      await Controller.deleteById(req, res, next);

      expect(Service.deleteById.calledOnceWith('id')).to.be.true;
    });

    it('should call res.status with 200', async () => {
      await Controller.deleteById(req, res, next);

      expect(res.json.callCount).to.be.equals(2);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('should call res.json with result', async () => {
      await Controller.deleteById(req, res, next);

      expect(res.json.callCount).to.be.equals(3);
      expect(res.json.calledWith(result)).to.be.true;
    });
  });
});
