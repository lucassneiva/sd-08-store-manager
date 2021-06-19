const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');

const ProductsModel = require('../../models/productsModel');
const SalesModel = require('../../models/salesModel');

describe('Teste da camada model', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  before( async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });


  describe('Products Model', () => {
    afterEach(async () => {
      const db = connectionMock.db('StoreManager');
      await db.collection('products').deleteMany({});
    })
    describe('Ao chamar o "create"', () => {
      it('retorna um objeto', async () => {
        const response = await ProductsModel.create({ name: 'Martelo', quantity: 22});
        expect(response).to.be.an('object');
      });

      it('retorna o objeto com a chave "_id", ', async () => {
        const response = await ProductsModel.create({ name: 'Tesoura', quantity: 12});
        expect(response).to.have.property('_id');
      })
    })

    describe('Ao chamar o "getAll"', () => {
      beforeEach(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('products').insertMany([{name: 'Martelo', quantity: 21},
        {name: 'Tesoura', quantity: 11}]);
      });

      it('retorna um array', async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.an('array');
      })

      it('retorna um array com todos os produtos cadastrados', async () => {
        const response = await ProductsModel.getAll();
        expect(response[0].name).to.be.equals('Martelo');
        expect(response[0].quantity).to.be.equals(21);
        expect(response[1].name).to.be.equals('Tesoura');
        expect(response[1].quantity).to.be.equals(11);
      });
    })

    describe('Ao chama o "getById"', () => {
      describe('Quando informa um "id" inválido', () => {

        it('retorna um erro', async () => {
          try {
            await ProductsModel.getById('507f191e810c1');
          } catch (error) {
            expect(error.message).to.be
            .equals('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          }
        })
      })

      describe('Quando informa um "id" válido', () => {
        it('retorna um objeto', async () => {
          const { _id } = await ProductsModel.create( { name: 'Martelo', quantity: 22 } );
          const response = await ProductsModel.getById(_id);
          expect(response).to.be.an('object');
        });

        it('o objeto contém as chaves "_id", "name" e "quantity"', async () => {
          const { _id } = await ProductsModel.create( { name: 'Martelo', quantity: 22 } );
          const response = await ProductsModel.getById(_id);
          expect(response).to.have.all.keys('_id', 'name', 'quantity');
        })
      })
    });


    describe('Ao chamar o "getByName"', () => {
      it('Quando não encontra o produto', async () => {
        const response = await ProductsModel.getByName('Serrote');
        expect(response).to.be.false;
      })

      it('Quando encontra o produto', async () => {
        await ProductsModel.create({name: 'Martelo', quantity: 22});
        const response = await ProductsModel.getByName('Martelo');
        expect(response).to.be.an('object');
      })
    });

    describe('Ao chamar "update"', () => {
      describe('Quando informa um "id" inválido', () => {
        it('retorna um erro com a mensagem "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"', async () => {
          try {
            await ProductsModel.update('507f191e810c1', 'Serrote', 45)
          } catch ({message}) {
            expect(message).to.be
            .equals('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          }
        });
      })
      describe('Quando informa um "id" válido', () => {
        it('retorna um objeto com as chaves "_id", "name" e "quantity" com os valores atualizados', async () => {
          const { _id } = await ProductsModel.create({name: 'Martelo', quantity: 22});
          const { value } = await ProductsModel.update(_id, 'Serrote', 11);
          expect(value).to.be.an('object');
          expect(value).to.have.all.keys('_id', 'name', 'quantity');
          expect(value).to.include({name: 'Serrote', quantity: 11});
        })
      })
    });

    describe('Ao chamar "exclude"', () => {
        it('retorna um erro ao informar um "id" inválido', async () => {
          try {
            await ProductsModel.exclude('507f191e810c1')
          } catch ({message}) {
            expect(message).to.be
            .equals('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          }
        })

      it('retorna um objeto com as chaves "_id", "name", "quantity" do objeto deletado', async () => {
        const { _id } = await ProductsModel.create({name: 'Martelo', quantity: 22});
        const { value } = await ProductsModel.exclude(_id);
        expect(value).to.be.an('object');
        expect(value).to.have.all.keys('_id', 'name', 'quantity');
      })
    })
  })



  describe('Sales Model', () => {

    afterEach(async () => {
      const db = connectionMock.db('StoreManager');
      await db.collection('sales').deleteMany({});
    });

    describe('Ao chamar "create"', () => {
      it('retorna um objeto com as chaves "_id", "itensSold"', async () => {
        const createSale = await SalesModel.create([{productId: '60cd2b9443dfec28a4a4241e', quantity: 2}]);
        const response = createSale.ops[0];
        expect(response).to.be.an('object');
        expect(response).to.have.all.keys('_id', 'itensSold');
      })
    })

    describe('Ao chamar "getAll"', () => {
      const sale1 = [
        { productId: '60cd2b9443dfec28a4a4241e', quantity: 22 },
        { productId: '60cd2b9443dfec28a4a4241f', quantity: 11 }
      ];
      const sale2 = [
        { productId: '60cd2b9443dfec28a4a4241g', quantity: 88 },
        { productId: '60cd2b9443dfec28a4a4241c', quantity: 210 }
      ]
      beforeEach(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('sales').insertMany([{itensSold: sale1}, { itensSold: sale2}]);
      })

      it('retorna um array', async () => {
        const response = await SalesModel.getAll();
        expect(response).to.be.an('array');
      })

      it(`contém as chaves "_id" e "itensSold" que é um array de objetos com as chaves
        "productId" e "quantity"`, async () => {
          const response = await SalesModel.getAll();
          response.forEach((resp) => {
            expect(resp).to.have.property('_id');
            expect(resp.itensSold).to.be.an('array');
            resp.itensSold.forEach((item) => {
              expect(item).to.have.all.keys('productId', 'quantity');
            })
          })
      })
    })

    describe('Ao chamar "getById"', () => {
      it(`Quando informa um "id" inválido, retorna um erro com a mensagem Argument
        passed in must be a single String of 12 bytes or a string of 24 hex characters`, async () => {
          try {
            await SalesModel.getById('60cd2b944');
          } catch ({ message }) {
            expect(message).to.be
            .equals('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          }
        });

      it('Quando informa um "id" válido, retorna um objeto com as chaves "_id" e "itensSold"', async () => {
        const { insertedId } = await SalesModel
          .create([{productId: '60cd2b9443dfec28a4a4241e', quantity: 2}]);
        const response = await SalesModel.getById(insertedId);
        expect(response).to.be.an('object').that.have.all.keys('_id', 'itensSold');
      })
    })

    describe('Ao chamar "update"', () => {
      it(`Quando informa um "id" inválido, retorna um erro com a mensagem Argument
        passed in must be a single String of 12 bytes or a string of 24 hex characters`, async () => {
          try {
            await SalesModel.update('60cd2b944', []);
          } catch ({ message }) {
            expect(message).to.be
            .equals('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          }
      });

      it(`Quando informa um "id válido, retorna as chaves "_id", "itensSold"
        com os valores atualizados`, async () => {
          const { insertedId } = await SalesModel
          .create([{productId: '60cd2b9443dfec28a4a4241e', quantity: 2}]);
        const updateSale = [ { productId: 'Alterado', quantity: 192 } ]
        const { value } = await SalesModel.update(insertedId, updateSale);
        expect(value).to.be.an('object').that.have.all.keys('_id', 'itensSold');
        expect(value.itensSold[0].productId).to.be.equals('Alterado');
        expect(value.itensSold[0].quantity).to.be.equals(192);
      })
    })

    describe('Ao chamar "exclude"', () => {
      it(`Quando informa um "id" inválido, retorna um erro com a mensagem Argument
      passed in must be a single String of 12 bytes or a string of 24 hex characters`, async () => {
        try {
          await SalesModel.exclude('60cd2b944');
        } catch ({ message }) {
          expect(message).to.be
          .equals('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
        }
      });
    })
    it('Quando informa um "id" válido, retorna o objeto que foi deletado', async () => {
      const { insertedId } = await SalesModel
          .create([{productId: '60cd2b9443dfec28a4a4241e', quantity: 2}]);
      const { value } = await SalesModel.exclude(insertedId);
      expect(value).to.be.an('object').that.include.keys('_id', 'itensSold');
      const confirmExclude = await SalesModel.getById(insertedId);
    })


  })
});
