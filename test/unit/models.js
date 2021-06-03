require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const connection = require('../../models/connection');
const ProductsModel = require('../../models/Products');
const SalesModel = require('../../models/Sales');

const productMock = {
  name: 'Produto de teste',
  quantity: 20
};

const saleMock = [
  {
    productId: ObjectId(),
    quantity: 15
  },
  {
    productId: ObjectId(),
    quantity: 5
  }
]

let connectionMock;

beforeEach(async () => {
  const mongodb = new MongoMemoryServer();
  const uri = await mongodb.getUri();
  
  connectionMock = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
});

afterEach(async () => {
  MongoClient.connect.restore();
  await connection.close(); // Gambiarra por causa do singleton
});

// PRODUCTS

describe('É possível inserir um novo produto no BD', () => {
  describe('Ao criar um novo produto', () => {
    it('retorna um objeto', async () => {
      const result = await ProductsModel.create(productMock);
      expect(result).to.be.a('object');
    });
    
    it('o objeto retornado deve ter as chaves _id, name e quantity', async () => {
      const result = await ProductsModel.create(productMock);
      expect(result).to.have.all.keys(['_id', 'name', 'quantity']);
    });
  });
});

describe('É possível buscar um produto pelo id', () => {
  describe('Quando o produto é encontrado', () => {
    it('retorna um objeto', async () => {
      const { _id: productId } = await ProductsModel.create(productMock);
      const result = await ProductsModel.getById(productId);
      expect(result).to.be.a('object');
    })

    it('o objeto retornado deve ter as chaves _id, name e quantity', async () => {
      const { _id: productId } = await ProductsModel.create(productMock);
      const result = await ProductsModel.getById(productId);
      expect(result).to.have.all.keys(['_id', 'name', 'quantity']);
    });
  })

  describe('Quando o ID é invalido', () => {
    it('retorna null', async () => {
      const result = await ProductsModel.getById('IDInválido');
      expect(result).to.be.null;
    })
  })

  describe('Quando não tem nenhum produto com aquele ID', () => {
    it('retorna null', async () => {
      const result = await ProductsModel.getById(ObjectId());
      expect(result).to.be.null;
    })
  })
})

describe('É possível buscar um produto pelo nome', () => {
  describe('Quando o produto é encontrado', () => {
    it('retorna um objeto', async () => {
      await ProductsModel.create(productMock);
      const result = await ProductsModel.getByName(productMock.name);
      expect(result).to.be.a('object');
    })

    it('o objeto retornado deve ter as chaves _id, name e quantity', async () => {
      await ProductsModel.create(productMock);
      const result = await ProductsModel.getByName(productMock.name);
      expect(result).to.have.all.keys(['_id', 'name', 'quantity']);
    });
  })

  describe('Quando não tem nenhum produto com aquele nome', () => {
    it('retorna null', async () => {
      const result = await ProductsModel.getByName('tuts tuts tuts');
      expect(result).to.be.null;
    })
  })
})

describe('É possível pegar todos os produtos do BD', () => {
  describe('Quando há produtos', () => {
    it('retorna um array com os produtos', async () => {
      await ProductsModel.create(productMock);
      const result = await ProductsModel.getAll();
      expect(result).to.be.a('array');
      expect(result).to.have.lengthOf(1);
    })
  })

  describe('Quando não há produtos', () => {
    it('retorna um array vazio', async () => {
      const result = await ProductsModel.getAll();
      expect(result).to.be.a('array');
      expect(result).to.have.lengthOf(0);
    })
  })
})

describe('É possível editar um produto', () => {
  describe('Quanto o ID é inválido', () => {
    it('retorna null', async () => {
      const result = await ProductsModel.edit(
        'InvalidID',
        { name: 'Nome alterado', quantity: 99 }
      );
      expect(result).to.be.null;
    })
  })

  describe('Quanto o id não corresponde a nenhum produto', () => {
    it('retorna null', async () => {
      const result = await ProductsModel.edit(
        ObjectId(),
        { name: 'Nome alterado', quantity: 99 }
      );
      expect(result).to.be.null;
    })
  })

  describe('Quando editar com sucesso', () => {
    it('retorna um objeto', async () => {
      const { _id: productId } = await ProductsModel.create(productMock);
      const result = await ProductsModel.edit(
        productId,
        { name: 'Nome alterado', quantity: 99 }
      );
      expect(result).to.be.a('object');
    });

    it('o objeto é o produto atualizado', async () => {
      const { _id: productId } = await ProductsModel.create(productMock);
      const result = await ProductsModel.edit(
        productId,
        { name: 'Nome alterado', quantity: 99 }
      );
      expect(result.name).to.equal('Nome alterado');
      expect(result.quantity).to.equal(99);
    })
  })
})

describe('É possível remover um produto do BD', () => {
  let productId;

  const setupProducts = async () => {
    const db = await connectionMock.db(process.env.DB_NAME)
    const { insertedId } = await db.collection('products')
      .insertOne({ ...productMock });
    productId = insertedId;
  }

  describe('Quando ID é inválido', () => {
    beforeEach(setupProducts);

    it('retorna null', async () => {
      const result = await ProductsModel.remove('InvalidID');
      expect(result).to.be.null;
    })
  })

  describe('A remover com sucesso', () => {
    beforeEach(setupProducts);

    it('retorna um object', async () => {
      const result = await ProductsModel.remove(productId);
      expect(result).to.be.a('object');
    })

    it('o objeto retornado contém os dados produto removido', async () => {
      const result = await ProductsModel.remove(productId);
      expect(result.name).to.equal(productMock.name);
      expect(result.quantity).to.equal(productMock.quantity);
      expect(result._id.toString()).to.equal(productId.toString());
    })
  })
})


// SALES

describe('É possível inserir uma nova venda no BD', () => {
  describe('Ao criar uma nova venda', () => {
    it('retorna um objeto', async () => {
      const result = await SalesModel.create(saleMock);
      expect(result).to.be.a('object');
    });

    it('o objeto retornado deve ter as chaves _id e itensSold', async () => {
      const result = await SalesModel.create(saleMock);
      expect(result).to.have.all.keys(['_id', 'itensSold']);
    });
  })
})

describe('É possível buscar uma venda pelo id', () => {
  describe('Quando a venda é encontrada', () => {
    it('retorna um objeto', async () => {
      const { _id: saleId } = await SalesModel.create(saleMock);
      const result = await SalesModel.getById(saleId);
      expect(result).to.be.a('object');
    })

    it('o objeto retornado deve ter as chaves _id e itensSold', async () => {
      const { _id: saleId } = await SalesModel.create(saleMock);
      const result = await SalesModel.getById(saleId);
      expect(result).to.have.all.keys(['_id', 'itensSold']);
    });
  })

  describe('Quando o ID é invalido', () => {
    it('retorna null', async () => {
      const result = await SalesModel.getById('IDInválido');
      expect(result).to.be.null;
    })
  })

  describe('Quando não tem nenhuma venda com aquele ID', () => {
    it('retorna null', async () => {
      const result = await SalesModel.getById(ObjectId());
      expect(result).to.be.null;
    })
  })
})

describe('É possível pegar todas as vendas do BD', () => {
  const setupSales = async () => {
    const db = await connectionMock.db(process.env.DB_NAME)
    await db.collection('sales')
      .insertOne({ ...saleMock });
  }

  describe('Quando há vendas', () => {
    beforeEach(setupSales);

    it('retorna um array com as vendas', async () => {
      const result = await SalesModel.getAll();
      expect(result).to.be.a('array');
      expect(result).to.have.lengthOf(1);
    })
  })

  describe('Quando não há vendas', () => {
    it('retorna um array vazio', async () => {
      const result = await SalesModel.getAll();
      expect(result).to.be.a('array');
      expect(result).to.have.lengthOf(0);
    })
  })
})

describe('É possível editar uma venda', () => {
  let saleId;
  let productId;

  const setup = async () => {
    const db = await connectionMock.db(process.env.DB_NAME);

    const { insertedId } = await db.collection('product')
      .insertOne({ ...productMock });

    productId = insertedId;

    const itensSold = [
      { productId, quantity: 15 },
      { productId, quantity: 5 }
    ]
    
    const { insertedId: insertedIdSale } = await db.collection('sales')
      .insertOne({ itensSold: [ ...itensSold ] });

    saleId = insertedIdSale;
  }

  describe('Quando o ID da venda é inválido', () => {
    it('retorna null', async () => {
      const result = await SalesModel.edit('InvalidID', []);
      expect(result).to.be.null;
    })
  })

  describe('Quando editar com sucesso', () => {
    beforeEach(setup);

    it('retorna um objeto', async () => {
      const result = await SalesModel.edit(saleId, []);
      expect(result).to.be.a('object');
    })

    it('o objeto deve ter as propriedades _id e itensSold atualizadas', async () => {
      const newSale = [
        { productId, quantity: 99 },
        { productId, quantity: 999 },
      ]

      const result = await SalesModel.edit(saleId, newSale);
      const { itensSold } = result;

      expect(result).to.have.all.keys(['_id', 'itensSold']);
      expect(itensSold).to.have.lengthOf(2);
      expect(itensSold[0].productId.toString()).to.equal(productId.toString());
      expect(itensSold[0].quantity).to.equal(99);
      expect(itensSold[1].productId.toString()).to.equal(productId.toString());
      expect(itensSold[1].quantity).to.equal(999);
    })
  })
})

describe('É possível remover uma venda', () => {
  let productId;
  let saleId;

  const setup = async () => {
    const db = await connectionMock.db(process.env.DB_NAME);

    const { insertedId } = await db.collection('product')
      .insertOne({ ...productMock });
      
    productId = insertedId;
    
    const itensSold = [
      { productId, quantity: 15 },
      { productId, quantity: 5 }
    ]
    
    const { insertedId: insertedIdSale } = await db.collection('sales')
      .insertOne({ itensSold: [ ...itensSold ] });

    saleId = insertedIdSale;
  }

  describe('Quando o ID é inválido', () => {
    it('retorna null', async () => {
      const result = await SalesModel.remove('InvalidID');
      expect(result).to.be.null;
    })
  })

  describe('Quando não há nenhuma venda com o ID', () => {
    it('retorna null', async () => {
      const result = await SalesModel.remove(ObjectId());
      expect(result).to.be.null;
    })
  })

  describe('Quando remover com sucesso', () => {
    beforeEach(setup);

    it('retorna um objeto', async () => {
      const result = await SalesModel.remove(saleId);
      expect(result).to.be.a('object');
    })

    it('o objeto deve ter as chaves _id e itensSold e ser referente a venda removida', async () => {
      const result = await SalesModel.remove(saleId);
      const { itensSold } = result;
      expect(result).to.have.all.keys(['_id', 'itensSold']);
      expect(result._id.toString()).to.equal(saleId.toString());
      expect(itensSold).to.have.lengthOf(2);
      expect(itensSold[0].productId.toString()).to.be.equal(productId.toString());
      expect(itensSold[0].quantity).to.be.equal(15);
      expect(itensSold[1].productId.toString()).to.be.equal(productId.toString());
      expect(itensSold[1].quantity).to.be.equal(5);
    })
  })
})
