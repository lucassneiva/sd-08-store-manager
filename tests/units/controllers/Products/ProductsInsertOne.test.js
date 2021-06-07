const sinon = require('sinon');
const { expect } = require('chai');

const Controller = require('../../../../controllers').Products;
const Service = require('../../../../services').Products;

describe('Products controller: insertOne()', () => {
  const req = {};
  const res = {};
  const next = sinon.stub().returns();
  let result;
  let error;

  before(() => {
    req.body = { obj: 'any' };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(undefined);
  });

  describe('when the Service throws an error', () => {
    before(() => {
      error = new Error('Server error');
      sinon.stub(Service, 'insertOne').throws(error);
    });

    after(() => {
      Service.insertOne.restore();
    });

    it('should call next with the error', async () => {
      await Controller.insertOne(req, res, next);

      expect(next.calledOnceWith({ code: 'internal_error', message: error.message })).to.be.true;
    });

  });

  describe('when the Service resolves { error }', () => {
    before(() => {
      error = { code: 'already_exists', message: 'error message' };
      sinon.stub(Service, 'insertOne').resolves({ error });
    });

    after(() => {
      Service.insertOne.restore();
    });

    it('should call Service.insertOne with req.body', async () => {
      await Controller.insertOne(req, res, next);

      expect(Service.insertOne.calledOnceWith(req.body)).to.be.true;
    });

    it('should call next with error', async () => {
      await Controller.insertOne(req, res, next);

      expect(next.callCount).to.be.equals(3);
      expect(next.calledWith(error)).to.be.true;
    });
  });

  describe('when the Service resolves { result }', () => {
    before(() => {
      result = [{ id: 1}];
      sinon.stub(Service, 'insertOne').resolves({ result });
    });

    after(() => {
      Service.insertOne.restore();
    });

    it('should call once Service.insertOne with req.body', async () => {
      await Controller.insertOne(req, res, next);

      expect(Service.insertOne.calledOnceWith(req.body)).to.be.true;
    });

    it('should call res.status with 201', async () => {
      await Controller.insertOne(req, res, next);

      expect(res.status.callCount).to.be.equals(2);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it('should call res.json with result', async () => {
      await Controller.insertOne(req, res, next);

      expect(res.json.callCount).to.be.equals(3);
      expect(res.json.calledWith(result)).to.be.true;
    });

  });
});
