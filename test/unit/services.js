const sinon = require('sinon');
const { expect } = require('chai');

const StoreModel = require('../../models/storeModel');
const StoreService = require('../../services/storeService');

describe('Na camada SERVICES', async () => {
  describe('ao chamar CREATE para inserir um novo produto', async () => {
    describe('quando o payload informado não é válido', async () => {
      const payloadProduct = {};
  
      it('retorna um objeto', async () => {
        const response = await StoreService.create(payloadProduct);
        expect(response).to.be.a('object');
      });
  
      it('o retorno é um objeto que contem uma propriedade error', async () => {
        const response = await StoreService.create(payloadProduct);
        expect(response).to.have.a.property('details');
      });
    });
  
    describe('quando o payload contem no nome uma string com o tamanho menor do que 5 caracteres', async () => {
      const payloadProduct = {
        name: 'Bat',
        quantity: 100,
      };
  
      it('o retorno é um objeto Joi', async () => {
        const response = await StoreService.create(payloadProduct);
        expect(response.isJoi).to.be.equal(true);
      });
  
      it('o retorno é proveniente da validaçao "string.min"', async () => {
        const response = await StoreService.create(payloadProduct);
        expect(response.details[0].type).to.be.equal('string.min');
      });
    });
  
    describe('quando o payload contem na quantidade um inteiro menor do que 0', async () => {
      const payloadProduct = {
        name: 'Produto do Batista',
        quantity: -100,
      };
  
      it('o retorno é um objeto Joi', async () => {
        const response = await StoreService.create(payloadProduct);
        expect(response.isJoi).to.be.equal(true);
      });
  
      it('o retorno é proveniente da validaçao "number.min"', async () => {
        const response = await StoreService.create(payloadProduct);
        expect(response.details[0].type).to.be.equal('number.min');
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
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao chamar GETALL para buscar todos os produtos', async () => {
    describe('quando não existe produtos criados', async () => {
      before(() => {
        sinon.stub(StoreModel, 'getAll').resolves([]);
      });
  
      after(() => {
        StoreModel.getAll.restore();
      });
  
      it('o retorno é uma array vazia', async () => {
        const response = await StoreService.getAll();
        expect(response).to.be.an('array');
        expect(response).to.be.empty;
      });
    });
  
    describe('quando existem produtos criados', async () => {
      const payloadProduct = [
        {
          _id: '60c13544b7b98a438cb1e2cc',
          name: 'Produto do Batista',
          quantity: 10
        },
        {
          _id: '60c13544b7b98a438cb1e2cd',
          name: 'Produto Silva',
          quantity: 10
        },
      ];

      before(() => {
        sinon.stub(StoreModel, 'getAll').resolves(payloadProduct);
      });
  
      after(() => {
        StoreModel.getAll.restore();
      });
  
      it('retorna um array', async () => {
        const response = await StoreService.getAll();
        expect(response).to.be.an('array');
      });

      it('o array não está vazio', async () => {
        const response = await StoreService.getAll();
        expect(response).to.be.not.empty;
      });
  
      it('o array possuem itens do tipo objeto', async () => {
        const [ item ] = await StoreService.getAll();
        expect(item).to.be.an('object');
      });
  
      it('tais itens possuem as propriedades "_id", "name" e "quantity"', async () => {
        const [ item ] = await StoreService.getAll();
        expect(item).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao chamar FINDBYID para buscar um produto através do ID', async () => {
    const ID_EXAMPLE = '5f43a7ca92d58904914656b6'
    const ID_INVALID = '12345'
    const payloadProduct = {
      name: 'Produto do Batista',
      quantity: 100,
    };

    describe('quando Id não é válido', async() => {
      before(() => {
        sinon.stub(StoreModel, 'findById').resolves(null);
      });
  
      after(() => {
        StoreModel.findById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
        const response = await StoreService.findById(ID_INVALID);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong id format');
      });
    });

    describe('quando não é encontrado uma correspondência', async() => {
      before(() => {
        sinon.stub(StoreModel, 'findById').resolves(null);
      });
  
      after(() => {
        StoreModel.findById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
        const response = await StoreService.findById(ID_EXAMPLE);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong id format');
      });
    });
      
    describe('quando existe uma correspondência', async () => {
      before(() => {
        sinon.stub(StoreModel, 'findById').resolves({ _id: ID_EXAMPLE, ...payloadProduct });
      });
  
      after(() => {
        StoreModel.findById.restore();
      });
  
      it('retorna um objeto', async () => {
        const response = await StoreService.findById(ID_EXAMPLE);
        expect(response).to.be.an('object');
      });
  
      it('o objeto possui as propriedades "_id", "name" e "quantity"', async () => {
        const response = await StoreService.findById(ID_EXAMPLE);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao chamar UPDATEBYID para buscar um produto através do ID', async () => {
    const ID_EXAMPLE = '5f43a7ca92d58904914656b6'
    const NAME_EXAMPLE= 'Produto do Silva';
    const QUANTITY_EXAMPLE = 100;

    const ID_INVALID = '12345'
    const NAME_INVALID = 'Pro';
    const QUANTITY_INVALID = -100;

    describe('quando Id não é válido', async() => {
      before(() => {
        sinon.stub(StoreModel, 'updateById').resolves({ modifiedCount: 0 });
      });
  
      after(() => {
        StoreModel.updateById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
        const response = await StoreService.updateById(ID_INVALID, NAME_EXAMPLE, QUANTITY_EXAMPLE);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong id format');
      });
    });

    describe('quando o payload informado não é válido', async () => {  
      it('retorna um objeto', async () => {
        const response = await StoreService.updateById(ID_EXAMPLE, NAME_INVALID, QUANTITY_INVALID);
        expect(response).to.be.a('object');
      });
  
      it('o retorno é um objeto que contem uma propriedade error', async () => {
        const response = await StoreService.updateById(ID_EXAMPLE, NAME_INVALID, QUANTITY_INVALID);
        expect(response).to.have.a.property('details');
      });
    });
  
    describe('quando o payload contem no nome uma string com o tamanho menor do que 5 caracteres', async () => {  
      it('o retorno é um objeto Joi', async () => {
        const response = await StoreService.updateById(ID_EXAMPLE, NAME_INVALID, QUANTITY_EXAMPLE);
        expect(response.isJoi).to.be.equal(true);
      });
  
      it('o retorno é proveniente da validaçao "string.min"', async () => {
        const response = await StoreService.updateById(ID_EXAMPLE, NAME_INVALID, QUANTITY_EXAMPLE);
        expect(response.details[0].type).to.be.equal('string.min');
      });
    });
  
    describe('quando o payload contem na quantidade um inteiro menor do que 0', async () => {
      it('o retorno é um objeto Joi', async () => {
        const response = await StoreService.updateById(ID_EXAMPLE, NAME_EXAMPLE, QUANTITY_INVALID);
        expect(response.isJoi).to.be.equal(true);
      });
  
      it('o retorno é proveniente da validaçao "number.min"', async () => {
        const response = await StoreService.updateById(ID_EXAMPLE, NAME_EXAMPLE, QUANTITY_INVALID);
        expect(response.details[0].type).to.be.equal('number.min');
      });
    });

    // describe('quando não é encontrado uma correspondência', async() => {
    //   before(() => {
    //     sinon.stub(StoreModel, 'updateById').resolves({ modifiedCount: 0 });
    //   });
  
    //   after(() => {
    //     StoreModel.updateById.restore();
    //   });
  
    //   it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
    //     const response = await StoreService.updateById(ID_EXAMPLE, NAME_EXAMPLE, QUANTITY_EXAMPLE);
    //     expect(response).to.be.a('object');
    //     expect(response.message).to.be.equal('Wrong id format');
    //   });
    // });
      
    describe('quando existe uma correspondência', async () => {
      before(() => {
        sinon.stub(StoreModel, 'updateById').resolves({ modifiedCount: 1 });
      });
  
      after(() => {
        StoreModel.updateById.restore();
      });
  
      it('retorna um objeto', async () => {
        const response = await StoreService.updateById(ID_EXAMPLE, NAME_EXAMPLE, QUANTITY_EXAMPLE);
        expect(response).to.be.an('object');
      });
  
      it('o objeto possui as propriedades "modifiedCount"', async () => {
        const response = await StoreService.updateById(ID_EXAMPLE, NAME_EXAMPLE, QUANTITY_EXAMPLE);
        expect(response).to.have.a.property('modifiedCount')
      });
    });
  });

  describe('ao chamar DELETEBYID para deletar um produto através do ID', async () => {
    const ID_EXAMPLE = '5f43a7ca92d58904914656b6'
    const ID_INVALID = '12345'
    const payloadProduct = {
      name: 'Produto do Batista',
      quantity: 100,
    };

    describe('quando Id não é válido', async() => {
      before(() => {
        sinon.stub(StoreModel, 'deleteById').resolves(null);
      });
  
      after(() => {
        StoreModel.deleteById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
        const response = await StoreService.deleteById(ID_INVALID);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong id format');
      });
    });

    describe('quando não é encontrado uma correspondência', async() => {
      before(() => {
        sinon.stub(StoreModel, 'deleteById').resolves(null);
      });
  
      after(() => {
        StoreModel.deleteById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
        const response = await StoreService.deleteById(ID_EXAMPLE);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong id format');
      });
    });
      
    describe('quando existe uma correspondência', async () => {
      before(() => {
        sinon.stub(StoreModel, 'deleteById').resolves({ _id: ID_EXAMPLE, ...payloadProduct });
      });
  
      after(() => {
        StoreModel.deleteById.restore();
      });
  
      it('retorna um objeto', async () => {
        const response = await StoreService.deleteById(ID_EXAMPLE);
        expect(response).to.be.an('object');
      });
  
      it('o objeto possui as propriedades "_id", "name" e "quantity"', async () => {
        const response = await StoreService.deleteById(ID_EXAMPLE);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });
});
