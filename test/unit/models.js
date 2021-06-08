const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { addProduct, getAllProducts, findByIdProducts,
  updateProducts, deleteProducts } = require('../../models/productsModel');

const { addSales, getAllSales, findByIdSales,
  updateSales, deleteSales } = require('../../models/salesModel');

describe('Função de adicionar um novo produto.', () => {
  const { name, quantity } = {
    name: 'Bola de futebol',
    quantity: 20
  };

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const coonnectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(coonnectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });


  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await addProduct(name, quantity);

      expect(response).to.be.a('object');
    });

    it('o objeto possui o "id" do novo produto', async () => {
      const response = await addProduct(name, quantity);

      expect(response).to.be.a.property('_id');
    });
  });
});

describe('Função de Listar todos os produtos com ID ou sem.', () => {
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const coonnectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(coonnectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });


  describe('quando não existe nenhum produto', () => {
    it('retorna um array de objetos', async () => {
      const response = await getAllProducts();

      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const response = await getAllProducts();

      expect(response).to.be.empty;
    });
  });

  describe('quando o id e inválido', () => {
    const ID = '99dfsdf';

    it('retorna null', async () => {
      const response = await findByIdProducts(ID);

      expect(response).to.be.null;
    });
  });
});

describe('Função de update de produtos', () => {
  const { id, name, quantity } = {
    id: '60be5b5e3fb914a301cb682a',
    name: 'Bola de futebol',
    quantity: 5
  };

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const coonnectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(coonnectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando atualizado com sucesso', () => {
    it('Retorna um objeto', async () => {
      const result = await updateProducts(id, name, quantity);

      expect(result).to.be.a('object');
    });

    it('O objeto possui a quantidade nova alterada', async () => {
      const result = await updateProducts(id, name, quantity);

      expect(result.quantity).to.equal(5);
    });
  });
});

describe('Funcão de deletar produtos', () => {
  const ID = '60be5b5e3fb914a301cb682a';

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const coonnectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(coonnectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando a exclusão foi com sucesso', () => {
    it('Retorna um objeto', async () => {
      const result = await deleteProducts(ID);

      expect(result).to.be.a('object');
    });
  });
});

describe('Função de adicionar uma nova venda.', () => {
  const sale = [
    {
      productId: '60be5b5e3fb914a301cb682a',
      quantity: 10
    }
  ];

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const coonnectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(coonnectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });


  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await addSales(sale);

      expect(response).to.be.a('object');
    });

    it('o objeto possui o "id" do novo produto', async () => {
      const response = await addSales(sale);

      expect(response).to.be.a.property('_id');
    });
  });
});

describe('Função de Listar todas as vendas com ID ou sem.', () => {
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const coonnectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(coonnectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });


  describe('quando não existe nenhum produto', () => {
    it('retorna um array de objetos', async () => {
      const response = await getAllSales();

      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const response = await getAllSales();

      expect(response).to.be.empty;
    });
  });

  describe('quando o id e inválido', () => {
    const ID = '99dfsdf';

    it('retorna null', async () => {
      const response = await findByIdSales(ID);

      expect(response).to.be.null;
    });
  });
});

describe('Função de update de vendas', () => {
  const sale = [
    {
      productId: '60be5b5e3fb914a301cb682a',
      quantity: 20
    }
  ];

  const ID = '60be5b5e3fb914a301cb682a';

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const coonnectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(coonnectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando atualizado com sucesso', () => {
    it('Retorna um objeto', async () => {
      const result = await updateSales(ID, sale);

      expect(result).to.be.a('object');
    });
  });
});

// describe('Funcão de deletar vendas', () => {
//   const ID = '60be5b5e3fb914a301cb682a';

//   before(async () => {
//     const DBServer = new MongoMemoryServer();
//     const URLMock = await DBServer.getUri();
//     const coonnectionMock = await MongoClient.connect(URLMock, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     sinon.stub(MongoClient, 'connect').resolves(coonnectionMock);
//   });

//   after(() => {
//     MongoClient.connect.restore();
//   });

//   describe('Quando a exclusão foi com sucesso', () => {
//     it('Retorna um objeto', async () => {
//       const result = await deleteSales(ID);

//       expect(result).to.be.a('object');
//     });
//   });
// });
