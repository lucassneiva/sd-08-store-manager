const sinon = require('sinon');
const { expect } = require('chai');

const Controller = require('../../../../controllers').Sales;
const Service = require('../../../../services').Sales;

describe('Sales controller: getAll()', () => {
  const req = {};
  const res = {};
  const next = sinon.stub().returns();
  let result;
  let error;

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(undefined);
  });

  describe('when the Service throws an error', () => {
    before(() => {
      error = new Error('Server error');
      sinon.stub(Service, 'getAll').throws(error);
    });

    after(() => {
      Service.getAll.restore();
    });

    it('should call next with the error', async () => {
      await Controller.getAll(req, res, next);

      expect(next.calledOnceWith({ code: 'internal_error', message: error.message })).to.be.true;
    });

  });

  describe('when the Service resolves { result }', () => {
    before(() => {
      result = [{ id: 1}];
      sinon.stub(Service, 'getAll').resolves({ result });
    });

    after(() => {
      Service.getAll.restore();
    });

    it('should call once res.status with 200', async () => {
      await Controller.getAll(req, res, next);

      expect(res.status.calledOnceWith(200)).to.be.true;
    });

    it('should call once res.json with result', async () => {
      await Controller.getAll(req, res, next);

      expect(res.json.callCount).to.be.equals(2);
      expect(res.json.calledWith(result)).to.be.true;
    });

  });
});
