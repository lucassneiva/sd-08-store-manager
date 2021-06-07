const sinon = require('sinon');
const { expect } = require('chai');

const Controller = require('../../../../controllers').Sales;
const Service = require('../../../../services').Sales;

describe('Sales controller: findById()', () => {
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
      sinon.stub(Service, 'findById').throws(error);
    });

    after(() => {
      Service.findById.restore();
    });

    it('should call next with the error', async () => {
      await Controller.findById(req, res, next);

      expect(next.calledOnceWith({ code: 'internal_error', message: error.message })).to.be.true;
    });

  });

  describe('when the Service resolves { error }', () => {
    before(() => {
      error = { code: 'not_found', message: 'error message' };
      sinon.stub(Service, 'findById').resolves({ error });
    });

    after(() => {
      Service.findById.restore();
    });

    it('should call Service.findById with "id"', async () => {
      await Controller.findById(req, res, next);

      expect(Service.findById.calledOnceWith('id')).to.be.true;
    });

    it('should call once next error', async () => {
      await Controller.findById(req, res, next);

      expect(next.calledWith(error)).to.be.true;
    });
  });

  describe('when the Service resolves { result }', () => {
    before(() => {
      result = { id: 1};
      sinon.stub(Service, 'findById').resolves({ result });
    });

    after(() => {
      Service.findById.restore();
    });

    it('should call Service.findById with "id"', async () => {
      await Controller.findById(req, res, next);

      expect(Service.findById.calledOnceWith('id')).to.be.true;
    });

    it('should call res.status with 200', async () => {
      await Controller.findById(req, res, next);

      expect(res.json.callCount).to.be.equals(2);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('should call res.json with result', async () => {
      await Controller.findById(req, res, next);

      expect(res.json.callCount).to.be.equals(3);
      expect(res.json.calledWith(result)).to.be.true;
    });
  });
});
