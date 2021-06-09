const sinon = require('sinon');
const { expect } = require('chai');

const StoreService = require('../../services/storeService');
const StoreController = require('../../controllers/storeController');

describe('Na camada CONTROLLERS', () => {
  describe('Ao chamar o controller de create', () => {
    describe('quando o payload informado não é válido', async () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        isJoi: true,
        details: [{
          message: 'validate error',
        }],
      };
  
      before(() => {
        request.body = {};
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'create').resolves(error);
      });
  
      after(() => {
        StoreService.create.restore();
      });
  
      it('chama o método next com objeto', async () => {
        await StoreController.create(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('validate error')).to.be.equal(true);
      });
    });
  
    describe('quando já existe um produto com mesmo nome', async () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        message: 'Product already exists',
      };
  
      before(() => {
        request.body = {};
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'create').resolves(error);
      });
  
      after(() => {
        StoreService.create.restore();
      });
  
      it('chama o método next com a string de erro', async () => {
        await StoreController.create(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Product already exists')).to.be.equal(true);
      });
    });
  
    describe('quando é inserido com sucesso', async () => {
      const response = {};
      const request = {};
      const ID_EXAMPLE = '5f43a7ca92d58904914656b6';
      const payloadProduct = {
        name: 'Produto do Batista',
        quantity: 100,
      };
  
      before(() => {
        request.body = payloadProduct;
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(StoreService, 'create')
          .resolves({ _id: ID_EXAMPLE, ...payloadProduct });
      });
  
      after(() => {
        StoreService.create.restore();
      });
  
      it('é chamado o status com o código 201', async () => {
        await StoreController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('é chamado o json com objeto do produto adicionado', async () => {
        await StoreController.create(request, response);
  
        expect(response.json.calledWith({ _id: ID_EXAMPLE, ...payloadProduct })).to.be.equal(true);
      });
    });
  });
});
