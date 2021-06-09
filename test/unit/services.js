const sinon = require('sinon');
const { expect } = require('chai');

const StoreModel = require('../../models/storeModel');
const StoreService = require('../../services/storeService');

describe('Ao inserir um novo produto no BD', () => {
  describe('quando o payload informado não é válido', async () => {
    const payloadProduct = {};

    it('retorna um objeto', async () => {
      const response = await StoreService.create(payloadProduct);
      expect(response).to.be.a('object');
    });

    it('o retorno é um objeto que contem uma propriedade error', async () => {
      const response = await StoreService.create(payloadProduct);
      expect(response).to.have.a.property('error');
    });
  });

  describe('quando o payload contem um nome com o tamanho menor do que 5 caracteres', async () => {
    const payloadProduct = {
      name: 'Bat',
      quantity: 100,
    };

    it('o retorno é um objeto Joi', async () => {
      const response = await StoreService.create(payloadProduct);
      expect(response.error.isJoi).to.be.equal(true);
    });

    it('o retorno é proveniente da validaçao "string.min"', async () => {
      const response = await StoreService.create(payloadProduct);
      expect(response.error.details[0].type).to.be.equal('string.min');
    });
  });

  describe('quando o payload contem uma quantidade menor do que 0', async () => {
    const payloadProduct = {
      name: 'Produto do Batista',
      quantity: -100,
    };

    it('o retorno é um objeto Joi', async () => {
      const response = await StoreService.create(payloadProduct);
      expect(response.error.isJoi).to.be.equal(true);
    });

    it('o retorno é proveniente da validaçao "number.min"', async () => {
      const response = await StoreService.create(payloadProduct);
      expect(response.error.details[0].type).to.be.equal('number.min');
    });
  });

  describe('o nome do novo produto já existe no banco de dados', async () => {
    const ID_EXAMPLE = '5f43a7ca92d58904914656b6';
    const payloadProduct = {
      name: 'Produto do Batista',
      quantity: 100,
    };

    before(() => {
      sinon.stub(StoreModel, 'findByName').resolves({ _id: ID_EXAMPLE, ...payloadProduct });
    });

    after(() => {
      StoreModel.findByName.restore();
    });

    it('o retorno é um objeto com mensagem "Product already exists"', async () => {
      const response = await StoreService.create(payloadProduct);
      expect(response).to.be.a('object');
      expect(response.message).to.be.equal('Product already exists');
    });
  });

  describe('o produto não existe no banco de dados e é adicionado com sucesso', async () => {
    const ID_EXAMPLE = '5f43a7ca92d58904914656b6';
    const payloadProduct = {
      name: 'Produto do Batista',
      quantity: 100,
    };

    before(() => {
      sinon.stub(StoreModel, 'findByName').resolves(null);
      sinon.stub(StoreModel, 'create').resolves({ _id: ID_EXAMPLE, ...payloadProduct });
    });

    after(() => {
      StoreModel.findByName.restore();
      StoreModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await StoreService.create(payloadProduct);
      expect(response).to.be.a('object');
    });

    it('retorna objeto com "_id", "name" e "quantity" do produto inserido', async () => {
      const response = await StoreService.create(payloadProduct);
      expect(response).to.have.a.property('_id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });
});
