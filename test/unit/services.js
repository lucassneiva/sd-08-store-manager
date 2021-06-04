const sinon = require('sinon');
const { ObjectId } = require('mongodb');
const { expect } = require('chai');

const ProductsModel = require('../../models/Products');
const ProductsService = require('../../services/Products');

const SalesModel = require('../../models/Sales');
const SalesService = require('../../services/Sales');

const productMock = {
  _id: ObjectId(),
  name: 'Produto de Teste',
  quantity: 100
}

// PRODUCTS

describe('É possível criar produtos', () => {
  describe('quando já existe um produto com o mesmo nome', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getByName').resolves(productMock)
    });

    after(() => ProductsModel.getByName.restore());

    it('retorna um objeto de erro com code e message', async () => {
      const result = await ProductsService.create(productMock);
      const { err } = result;
      expect(result).to.have.all.keys(['err']);
      expect(err).to.have.all.keys(['code', 'message']);
      expect(err.code).to.equal('invalid_data');
      expect(err.message).to.equal('Product already exists');
    })
  })

  describe('quando o produto for criado com sucesso', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getByName').resolves(null);
      sinon.stub(ProductsModel, 'create').resolves(productMock);
    })

    after(() => {
      ProductsModel.getByName.restore();
      ProductsModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const result = await ProductsService.create(productMock);
      expect(result).to.be.a('object');
    })

    it('retorna objeto referente ao cadastro', async () => {
      const result = await ProductsService.create(productMock);
      const { _id, name, quantity } = result;
      expect(result).to.have.all.keys(['_id', 'name', 'quantity']);
      expect(_id.toString()).to.equal(productMock._id.toString());
      expect(name).to.equal(productMock.name);
      expect(quantity).to.equal(productMock.quantity);
    })
  })
})

describe('É possível buscar produtos pelo ID', () => {
  describe('quando o produto é encontrado', () => {
    before(() => sinon.stub(ProductsModel, 'getById').resolves(productMock));

    after(() => ProductsModel.getById.restore());
  
    it('retorna um objeto', async () => {
      const result = await ProductsService.getById(ObjectId());
      expect(result).to.be.a('object');
    })
  })

  describe('quando o produto não é encontrado', () => {
    before(() => sinon.stub(ProductsModel, 'getById').resolves(null));

    after(() => ProductsModel.getById.restore());
  
    it('retorna um objeto de erro', async () => {
      const result = await ProductsService.getById(ObjectId());
      const { err } = result;
      expect(result).to.be.a('object');
      expect(result).to.have.property('err');
      expect(err).to.have.all.keys(['code', 'message']);
      expect(err.code).to.equal('invalid_data');
      expect(err.message).to.equal('Wrong id format');
    })
  })
})


describe('É possível pegar uma lista com todos os produtos', () => {
  describe('Quando houverem produtos', () => {
    before(() => {
      const productList = [
        { ...productMock },
        { ...productMock }
      ];

      sinon.stub(ProductsModel, 'getAll').resolves(productList);
    })

    after(() => ProductsModel.getAll.restore());

    it('retorna um array com todos os produtos', async () => {
      const result = await ProductsService.getAll();
      expect(result).to.be.a('array');
      expect(result).to.have.lengthOf(2);
    })
  })

  describe('Quando não houverem produtos', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getAll').resolves([]);
    })

    after(() => ProductsModel.getAll.restore());

    it('retorna um array vazio', async () => {
      const result = await ProductsService.getAll();
      expect(result).to.be.a('array');
      expect(result).to.have.lengthOf(0);
    })
  })
})

describe('É possível editar um produto', () => {
  describe('quando editado com sucesso', () => {
    before(() => sinon.stub(ProductsModel, 'edit').resolves(productMock));
  
    after(() => ProductsModel.edit.restore());

    it('retorna um objeto', async () => {
      // argumentos aleatórios só para manter o contrato kkkkk :poop:
      const result = await ProductsService.edit(ObjectId(), productMock);
      expect(result).to.be.a('object');
    })
  })

  describe('quando a editação falhar', () => {
    before(() => sinon.stub(ProductsModel, 'edit').resolves(null));
  
    after(() => ProductsModel.edit.restore());

    it('retorna null', async () => {
      // argumentos aleatórios só para manter o contrato kkkkk :poop:
      const result = await ProductsService.edit(ObjectId(), productMock);
      expect(result).to.be.null;
    })
  })
})

describe('É possível remover um produto', () => {
  describe('quando removido com sucesso', () => {
    before(() => sinon.stub(ProductsModel, 'remove').resolves(productMock));
  
    after(() => ProductsModel.remove.restore());

    it('retorna um objeto', async () => {
      const result = await ProductsService.remove(ObjectId());
      expect(result).to.be.a('object');
    })
  })

  describe('quando a remoção falhar', () => {
    before(() => sinon.stub(ProductsModel, 'remove').resolves(null));
  
    after(() => ProductsModel.remove.restore());

    it('retorna um objeto de erro', async () => {
      const result = await ProductsService.remove(ObjectId());
      const { err } = result;
      expect(result).to.be.a('object')
      expect(result).to.have.property('err');
      expect(err).to.have.all.keys(['code', 'message']);
      expect(err.code).to.equal('invalid_data');
      expect(err.message).to.equal('Wrong id format');
    })
  })
})

// SALES

describe('validateProducts deve receber um array de produtos', () => {
  describe('se todos constam no BD', () => {
    before(() => sinon.stub(ProductsModel, 'getById').resolves(productMock));

    after(() => ProductsModel.getById.restore());
    
    it('retorna null ', async () => {
      const itensSold = [
        {...productMock},
        {...productMock}
      ]
      const result = await SalesService.validateProducts(itensSold);
      expect(result).to.be.null;
    })
  })

  describe('se algum produto não constar no BD', () => {
    before(() => sinon.stub(ProductsModel, 'getById').resolves(null));

    after(() => ProductsModel.getById.restore());
    
    it('retorna um objeto de erro ', async () => {
      const itensSold = [
        {...productMock},
        {...productMock}
      ]

      const result = await SalesService.validateProducts(itensSold);
      expect(result).to.be.a('object');
      expect(result).to.have.property('err')

      const { err } = result;
      expect(err).to.have.all.keys(['code', 'message']);
      expect(err.code).to.equal('invalid_data');
      expect(err.message).to.equal('Wrong id format');
    })
  })
})

describe('É possível criar vendas no BD', () => {
  describe('quando algum produto não consta no BD', () => {
    before(() => sinon.stub(ProductsModel, 'getById').resolves(null));

    after(() => ProductsModel.getById.restore());

    it('retorna um objeto de erro', async () => {
      const products = [
        {...productMock},
        {...productMock}
      ]

      const result = await SalesService.create(products);
      expect(result).to.be.a('object');
      expect(result).to.have.property('err');

      const { err } = result;
      expect(err).to.have.all.keys(['code', 'message']);
      expect(err.code).to.equal('invalid_data');
      expect(err.message).to.equal('Wrong id format');
    })
  })

  describe('quando a quantidade do produto é inválida', () => {
    const productId = ObjectId();
    
    const product = {
      _id: productId,
      name: 'Produto de teste',
      quantity: 20
    }

    before(() => sinon.stub(ProductsModel, 'getById').resolves(product));

    after(() => ProductsModel.getById.restore());

    it('retorna um objeto de erro', async () => {
      const sale = [ { productId, quantity: 21 } ];

      const result = await SalesService.create(sale);
      expect(result).to.be.a('object');
      expect(result).to.have.property('err');

      const { err } = result;
      expect(err).to.have.all.keys(['code', 'message']);
      expect(err.code).to.equal('stock_problem');
      expect(err.message).to.equal('Such amount is not permitted to sell');
    })
  })

  describe('Quando a venda é criada com sucesso', () => {
    const productId = ObjectId();
    
    const product = {
      _id: productId,
      name: 'Produto de teste',
      quantity: 20
    }

    before(() => sinon.stub(ProductsModel, 'getById').resolves(product));

    after(() => ProductsModel.getById.restore());

    it('retorna um objeto', async () => {
      const sale = [ { productId, quantity: 18 } ];
      const result = await SalesService.create(sale);
      expect(result).to.be.a('object');
    })

    it('o objeto deverá representar a venda realizada', async () => {
      const sale = [ { productId, quantity: 18 } ];
      const result = await SalesService.create(sale);
      expect(result).to.have.all.keys(['_id', 'itensSold']);
      const { itensSold } = result;
      expect(itensSold[0].productId.toString()).to.equal(productId.toString());
      expect(itensSold[0].quantity).to.equal(18);
    })
  })
});

describe('É possível buscar a venda pelo Id', () => {
  describe('quando o ID é inválido ou a venda não existe', () => {
    before(() => sinon.stub(SalesModel, 'getById').resolves(null));

    after(() => SalesModel.getById.restore());

    it('retorna um objeto de erro', async () => {
      const result = await SalesService.getById(ObjectId());
      expect(result).to.be.a('object');
      expect(result).to.have.property('err');

      const { err } = result;
      expect(err).to.have.all.keys(['code', 'message']);

      const { code, message } = err;
      expect(code).to.equal('not_found');
      expect(message).to.equal('Sale not found');
    })
  });

  describe('quando encontra a venda', () => {
    before(() => sinon.stub(SalesModel, 'getById').resolves({}));

    after(() => SalesModel.getById.restore());

    it('retorna um objeto referente a ela', async () => {
      const result = await SalesService.getById(ObjectId());
      expect(result).to.be.a('object');
    })
  });
})

describe('É possível remover uma venda', () => {
  describe('quando o ID é inválido', () => {
    before(() => sinon.stub(SalesModel, 'remove').resolves(null));

    after(() => SalesModel.remove.restore());

    it('retorna um objeto de erro', async () => {
      const result = await SalesService.remove(ObjectId());
      expect(result).to.be.a('object');
      expect(result).to.have.property('err');
      
      const { err } = result;
      expect(err).to.have.all.keys(['code', 'message']);

      const { code, message } = err;
      expect(code).to.equal('invalid_data');
      expect(message).to.equal('Wrong sale ID format');
    })
  })

  describe('quando excluir com sucesso', () => {
    const saleId = ObjectId();
    const productId = ObjectId();

    before(() => sinon.stub(SalesModel, 'remove').resolves({
      _id: saleId,
      itensSold: [
        { productId, quantity: 20 },
      ]
    }));

    after(() => SalesModel.remove.restore());

    it('retorna um objeto com a venda excluída', async () => {
      const result = await SalesService.remove(saleId);
      expect(result._id).to.equal(saleId);
      expect(result.itensSold).to.be.a('array');
      const { itensSold } = result;
      expect(itensSold[0].productId.toString()).to.equal(productId.toString());
      expect(itensSold[0].quantity).to.equal(20);
    })
  })
})

describe('É possível recuperar todos as vendas', () => {
  const sales = [];

  before(() => sinon.stub(SalesModel, 'getAll').resolves(sales));

  after(() => SalesModel.getAll.restore());
  
  it('retorna todas as vendas', async () => {
    const result = await SalesService.getAll();
    expect(result).to.equal(sales);
  })
})

describe('É possível editar uma venda', () => {
  const editMock = {};
  const id = ObjectId();
  const updatedSale = {};

  before(() => sinon.stub(SalesModel, 'edit').resolves(editMock));

  after(() => SalesModel.edit.restore());

  it('Os argumentos devem ser passados para o Model (Proxy)', async () => {
    
    await SalesService.edit(id, updatedSale);
    const { args } = SalesModel.edit;
    expect(args[0][0]).to.equal(id);
    expect(args[0][1]).to.equal(updatedSale);
  })

  it('retorna o resultado do model', async () => {
    const result = await SalesService.edit(id, updatedSale);
    expect(result).to.equal(editMock);
  })
})
