const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const product = require('../../models/product');
const sale = require('../../models/sale');

describe('Testa o moedl do produto', () => {
  const productMock = {
    name: 'chuteira',
    quantity: 20
  };

  before(async () => {
    let DBServer = new MongoMemoryServer();
    let URLMock = await DBServer.getUri();

    let connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('criar objeto', async () => {
    it('retorna um objeto com id', async () => {
      const { name, quantity } = productMock;
      const result = await product.create(name, quantity);


      expect(result).to.be.an('object');
      expect(result).to.have.a.property('_id');
    });
  });

  describe('requisitar a lista inteira', async () => {
    it('retorna um array de produtos', async() => {
      const result = await product.getAll();

      expect(result).to.be.an('array')
      expect(result[0]).to.be.an('object');
    });
  });

  describe('prourar um produto por id', async () => {
    it('retorn um obejto com id', async() => {
      const { name, quantity } = productMock;
      const product = await product.create(name, quantity);
      const result = await product.getById(product._id)
      expect(result).to.be.an('object');
      expect(result).to.have.a.property('_id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });
  });

  describe('ao atualizar um produto', async () => {
    it('retorna um objeto com dados diferentes', async() => {
      const produto = await product.getAll().then((item) => item[0]);
      const id = produto._id;
      const quantidade = produto.quantity;
      await product.update(id, { quantity: 30 });

      const quantidadenova = await product.getAll().then((item) => item[0].quantity);
      expect(quantidadenova).not.to.be.equal(quantidade);
      expect(quantidadenova).not.to.be.equal(undefined);
    });
  });

  describe('ao deletar um produto', async() => {
    it('remove do banco', async () => {
      const products = await product.getAll().then((item) => item[0]);
      const id = products._id;
      await product.deleteById(id);
      const getProductById = await product.getById(id);
      expect(getProductById).to.be.null;
    })
  })
 });


describe('Model das sales', () => {
  const saleMock = [
    { productId: '1', quantity: 10 },
    { productId: '2', quantity: 20 }
  ]

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
  });

  describe('criar uma venda', async () => {
    it('retorna um objeto com id', async () => {
      const result = await sale.create(saleMock);

      expect(result).to.be.an('object');
      expect(result).to.have.a.property('_id');
    });
  });
});
  describe('listar todas vendas', async () => {
    it('retorna uma lista com as vendas', async() => {
      const result = await sale.getAll();

      expect(result).to.be.an('array')
      expect(result[0]).to.be.an('object');
    });
  });

  describe('ao atualizar uma venda', async () => {
    it('retorna um novo ogbjeto', async() => {
      const sale = await sale.create(saleMock);
      const result = await sale.update(sale._id, [{ productId: '3', quantity: 10 }]);

      expect(result.itensSold[0]).to.have.a.property('productId', '3')
    });
  });

  describe('deletar uma venda', async() => {
    it('remove do banco', async () => {
      const sales = await sale.getAll().then((item) => item[0]);
    const id = sales._id;
    await sale.deleteById(id);
    const getSalesById = await sale.getById(id);
    expect(getSalesById).to.be.null;
  });
});
