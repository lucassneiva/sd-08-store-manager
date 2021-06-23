
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const productModel = require('../../models/productModels');
const saleModel = require('../../models/salesModels');

describe('Teste Model', () => {
  const PayloadProduct = {
    name: 'kombi',
    quantity: 10
  };

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
    sinon.restore();
  });


  describe('Verifica se é possivel cadastar um produto com sucesso', async () => {
    it('', async () => {
      const {name, quantity } = PayloadProduct;
      productModel.createProduct({name, quantity});;
      const response = await productModel.findProduct({name});

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
      expect(response).to.have.a.property('name').equal('kombi');
    });
  });

  describe('Verifica se é possivel listar todos os produtos', async () => {
    it('', async () => {
      const {name, quantity } = PayloadProduct;
      productModel.createProduct({name, quantity});
      const response = await productModel.getAllProducts();

      expect(response).to.be.an('array');
      expect(response[0]).to.have.a.property('_id');
      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('quantity');

    });
  });

  describe('Verifica se é possivel atualizar um produto', async () => {
    it('Verifica a tenativa de update com id errado', async () => {
      const {name, quantity } = PayloadProduct;
      productModel.createProduct({name, quantity});
      const response = await productModel.findProduct({name});
      const idF =  9999;

      const responseAfterUpdate =  await productModel.getByID(idF);
      expect(responseAfterUpdate).to.be.an('null');


    });
    it('Verifica se o produto foi atualizado com sucesso', async () => {
      const {name, quantity } = PayloadProduct;
      productModel.createProduct({name, quantity});
      const response = await productModel.findProduct({name});
      const idF =  response._id;

      const PayloadProductToUpdate = {
        name: 'fusca',
        quantity: 10
      };

      const nameF = PayloadProductToUpdate.name;
      const quantityF = PayloadProductToUpdate.quantity;

      await productModel.updateProduct(idF,nameF, quantityF );

      const responseAfterUpdate =  await productModel.getByID(idF);
      expect(responseAfterUpdate).to.be.an('object');
      expect(responseAfterUpdate).to.have.a.property('name');
      expect(responseAfterUpdate).to.have.a.property('name').equal('fusca');
    });
  });

  describe('Verifica se é possivel deletar um produto com sucesso', async () => {
    it('Verifica se deleta com sucesso', async () => {
      const {name, quantity } = PayloadProduct;
      productModel.createProduct({name, quantity});;
      const response = await productModel.findProduct({name});
      const idF =  response._id;

      await productModel.deleteProduct(idF);
      const responseAfterDelete =  await productModel.getByID(idF);
      expect(responseAfterDelete).to.be.a('null');
    });
  });

  describe('Verifica se é possivel inserir uma venda com sucesso', async () => {
    it('Verifica se insere venda', async () => {
      const sale = [
                      {
                        "productId": "123456",
                        "quantity": "10",
                      }
                    ];

      const response = await saleModel.insertSales(sale);
      expect(response).to.be.an('object');
      expect(response).to.have.a.property('_id');
      expect(response).to.have.a.property('itensSold');
    });

    it('Verifica todas as vendas venda', async () => {
      const sale = [
                      {
                        "productId": "123456",
                        "quantity": "10",
                      }
                    ];

      const response = await saleModel.getAllSales();
      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
      expect(response[0]).to.have.a.property('_id');
      const objects = response[0];
      expect(objects).to.have.a.property('itensSold');
      expect(objects.itensSold[0]).to.have.a.property('productId');
    });
  });

  describe('Verifica se é possivel buscar uma venda pelo Id', async () => {
    it('Verifica se deleta com sucesso', async () => {
      const sale = [
        {
          "productId": "123456",
          "quantity": "10",
        }
      ];

      const response = await saleModel.insertSales(sale);

      const saleByID = await saleModel.getSaleByID(response._id);
      expect(saleByID).to.have.a.property('itensSold');

    });
  });

    describe('Verifica se é possivel buscar uma venda pelo Id', async () => {
      it('Verifica se deleta com sucesso', async () => {
        const sale = [
          {
            "productId": "123456",
            "quantity": "10",
          }
        ];

        const response = await saleModel.insertSales(sale);

        const saleByID = await saleModel.deleteSaleById(response._id);
        expect(saleByID.result).to.have.a('object');
        expect(saleByID.result).to.have.a.property('ok');
       });
     });

});
