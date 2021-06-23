const { expect } = require("chai");
const sinon = require('sinon');

const ProductsService = require('../../services/productsService');
const ProductsModel = require('../../models/productsModel');
const SalesModels = require('../../models/salesModel');
const SalesService = require('../../services/salesServices');

const validProduct = {
  _id: '604cb554311d68f491ba5781',
  name: 'Martelo',
  quantity: 2
}
const invalidProduct = {
  name: 'Pro',
  quantity: 0,
};

const validSaleDB = {
  _id: '123cb554311d68f491ba0123',
  itensSold: [
    {productId: validProduct._id, quantity: 1}
  ]
};

const validSale = [
  { productId: '123cb554311d68f491ba0123', quantity: 1 }
];
const invalidSale = [
  { productId: 'idInvalido', quantity: '0'}
];

describe('Products Service', () => {

  describe('Ao chamar "create"', () => {
    describe('Quando insere com os dados inválidos', () => {

      it('retorna um objeto', async () => {
        const response = await ProductsService.create(invalidProduct);
        expect(response).to.be.an('object');
      });

      it('o objeto contém a propriedade e valor "error: true"', async () => {
        const response = await ProductsService.create(invalidProduct);
        expect(response.error).to.be.equals(true);
      });
    })

    describe('Quado insere com os dados válido', () => {
      before( () => {
        sinon.stub(ProductsModel, 'create').resolves(validProduct);
        sinon.stub(ProductsModel, 'getByName').resolves(null);
      })

      after(() => {
        ProductsModel.create.restore();
        ProductsModel.getByName.restore();
      })

      it('retorna um objeto', async () => {
        const response = await ProductsService.create({name: 'Martelo', quantity: 2});
        expect(response).to.be.an('object');
      })

      it('retorna um objeto com a propriedade "_id"', async () => {
        const response = await ProductsService.create({
          name: 'Martelo',
          quantity: 2
        });
        expect(response).to.have.all.keys('_id', 'name', 'quantity');
      })
    });

    describe('Quando insere um produto que já existe', () => {
      before( () => {
        sinon.stub(ProductsModel, 'create').resolves(validProduct);
        sinon.stub(ProductsModel, 'getByName').resolves({name: 'Martelo'});
      })

      after(() => {
        ProductsModel.create.restore();
        ProductsModel.getByName.restore();
      })
      it('retorna a mensagem "Product already exists"', async () => {
        const response = await ProductsService.create({name: 'Service', quantity: 22});
        expect(response).to.have.property('message');
        expect(response.message).to.be.equals('Product already exists');
      })
    })
  })

  describe('Ao chamar "update"', () => {
    describe('Quando o produto existe', () => {
      describe('Quando insere dados inválidos', () => {
        it('retorna um objeto', async () => {
          const response = await ProductsService
            .update('604cb554311d', invalidProduct.name, invalidProduct.quantity);
          expect(response).to.be.an('object');
        });

        it('o objeto contém a propriedade e valor "error: true"', async () => {
          const response = await ProductsService.update(invalidProduct);
          expect(response.error).to.be.equals(true);
        });
      })

      describe('Quando insere dados válidos', () => {
        before(() => {
          sinon.stub(ProductsModel, 'update').resolves({
            value: {
              _id: validProduct._id,
              name: 'Tesoura',
              quantity: 310
            }
          });
        })

        after(() => {
          ProductsModel.update.restore();
        })

        it('retorna um objeto', async () => {
          const response = await ProductsService
            .update(validProduct._id,'Tesoura', 310);
          expect(response).to.be.an('object');
        })

        it('o objeto contém as chaves "_id", "name", "quantity" com os valores atualizados', async () => {
          const response = await ProductsService
            .update(validProduct._id,'Tesoura', 310);
          expect(response).to.have.all.keys('_id', 'name', 'quantity');
          expect(response.name).to.be.equals('Tesoura');
          expect(response.quantity).to.be.equals(310);
        })
      })
    })

    describe('Quando o produto não existe', () => {
      before(() => {
        sinon.stub(ProductsModel, 'update').resolves({value: null });
      })

      after(() => {
        ProductsModel.update.restore();
      })

      it('Deve retorna um objeto', async () => {
        const response = await ProductsService
          .update(validProduct._id, validProduct.name, validProduct.quantity);
        expect(response).to.be.an('object');
      })
      it('o objeto contém as chaves/valores "error: true" e "message: Product not found"', async () => {
        const response = await ProductsService
          .update(validProduct._id, validProduct.name, validProduct.quantity);
        expect(response).to.have.all.keys('error', 'message');
        expect(response.error).to.be.true;
        expect(response.message).to.be.equals('Product not found');
      })
    })
  })
});


describe('Sales Services', () => {

  describe('Ao chamar "create"', () => {
    describe('Quando insere um produto que não existe no DB ou uma quantidade inválida', () => {
      before(() => {
        sinon.stub(ProductsModel, 'getById').resolves(null);
      })
      after(() => {
        ProductsModel.getById.restore();
      })

      it('deve retornar um error com as chaves "code", "statusCode" e "message"', async () => {
        try {
          await SalesService.create(invalidSale);
        } catch ({ message, code, statusCode }) {
          expect(message).to.be.equals('Wrong product ID or invalid quantity');
          expect(code).to.be.equals('invalid_data');
          expect(statusCode).to.be.equals(422);
        }
      })
    })

    describe('Quando insere os dados válidos e existe o produto no DB', () => {
      before(() => {
        sinon.stub(ProductsModel, 'getById').resolves({name: 'Martelo', quantity: 22});
        sinon.stub(ProductsModel, 'update').resolves();
        sinon.stub(SalesModels, 'create').resolves({ops: [validSaleDB]});
      })

      after(() => {
        ProductsModel.getById.restore();
        ProductsModel.update.restore();
        SalesModels.create.restore();
      })

      it('retornar um objeto', async () => {
        const response = await SalesService.create(validSale);
        expect(response).to.be.an('object');
      })

      it('o objeto contém as chaves "_id", "itensSold" que contém "productId" e "quantity"', async () => {
        const response = await SalesService.create(validSale);
        expect(response).to.have.all.keys('_id', 'itensSold');
        response.itensSold.forEach((item) => {
          expect(item).to.have.all.keys('productId', 'quantity');
        })
      })
    })


  });
  describe('Ao chamar "update', () => {
    describe('Quando insere uma quantidade inválida', () => {
      it('retorna um erro', async () => {
        try {
          await SalesService.update('123cb554311d68f491ba0123',invalidSale);
        } catch ({ message }) {
          expect(message).to.be.equals('Invalid quantity');
        }
      })
    })

    describe('Quando insere todos os dados válidos', () => {
      before(() => {
        sinon.stub(SalesModels, 'update').resolves({
          value: validSaleDB
        })
      })

      after(() => {
        SalesModels.update.restore();
      })

      it('retorna um objeto', async () => {
        const response = await SalesService.update('123cb554311d68f491ba0123', validSale);
        expect(response).to.be.an('object');
      })

      it('o objeto contém as chaves "_id", "itensSold" que é um array e contém as chaves "productId", "quantity"', async () => {
        const response = await SalesService.update('123cb554311d68f491ba0123', validSale);
        expect(response).to.have.all.keys('_id', 'itensSold');
        expect(response.itensSold).to.be.an('array');
        response.itensSold.forEach((item) => {
          expect(item).to.have.all.keys('productId', 'quantity');
        })
      })
    })
  })

  describe('Ao chamar o "exclude"', () => {
    describe('Quando o "id" não existe no DB', () => {
      before(() => {
        sinon.stub(SalesModels, 'exclude').resolves({value: null});
      })

      after(() => {
        SalesModels.exclude.restore();
      })

      it('retorna um erro com a mensagem "Product not found"', async () => {
        try {
          await SalesService.exclude('123cb554311d68f491ba0123');
        } catch ({ message }) {
          expect(message).to.be.equals('Product not found')
        }
      })
    })

    describe('Quando informa um "id" de um produto existente no DB', () => {
      before(() => {
        sinon.stub(SalesModels, 'exclude').resolves({ value: validSaleDB });
        sinon.stub(ProductsModel, 'getById').resolves(validProduct);
        sinon.stub(ProductsModel, 'update').resolves();
      })

      after(() => {
        SalesModels.exclude.restore();
        ProductsModel.getById.restore();
        ProductsModel.update.restore();
      })

      it('retorna um objeto', async () => {
        const response = await SalesService.exclude('123cb554311d68f491ba0123');
        expect(response).to.be.an('object');
      })

      it('o objeto contém as chaves "_id" e "itensSold" que é um array com as chaves "productId" e "quantity"', async () => {
        const response = await SalesService.exclude('123cb554311d68f491ba0123');
        expect(response).to.have.all.keys('_id', 'itensSold');
        expect(response.itensSold).to.be.an('array');
        response.itensSold.forEach((item) => {
          expect(item).to.have.all.keys('productId', 'quantity');
        })
      })
    })
  })
})
