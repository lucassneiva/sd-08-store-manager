const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');

const ProductsController = require('../../controllers/Products');
const ProductsServices = require('../../services/Products');

const SalesController = require('../../controllers/Sales');
const SalesServices = require('../../services/Sales');

let request, response, next;

const productMock = {
  _id: ObjectId(),
  name: "Produto de Teste",
  quantity: 100
}

const errorMock = {
  err: {}
}

beforeEach(() => {
  request = {};
  response = {};
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns();
  next = sinon.stub().returns();
})

// PRODUCTS

describe('É possível criar um produto', () => {
  beforeEach(() => {
    request.body = {
      name: 'Produto de Teste',
      quantity: 100
    };
  })

  describe('quando o produto for criado com sucesso', () => {
    before(() => {
      sinon.stub(ProductsServices, 'create').resolves(productMock);
    });

    after(() => ProductsServices.create.restore());

    it('utiliza informações do body para criar novo produto', async () => {
      await ProductsController.create(request, response);
      const { args } = ProductsServices.create;
      expect(args[0][0]).to.be.a('object');
      expect(args[0][0].name).to.equal(request.body.name);
      expect(args[0][0].quantity).to.equal(request.body.quantity);
    })

    it('status deve ser chamado com 201', async () => {
      await ProductsController.create(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    })

    it('json devem ser chamado com o objeto do novo produto', async () => {
      await ProductsController.create(request, response);
      expect(response.json.calledWith(productMock)).to.be.true;
    })
  })

  describe('quando ocorrer erro na criação do produto', () => {
    before(() => sinon.stub(ProductsServices, 'create').resolves(errorMock));

    after(() => ProductsServices.create.restore());

    it('chama next com o objeto de erro', async () => {
      await ProductsController.create(request, response, next);
      expect(next.calledWith(errorMock)).to.be.true;
    })
  });
})

describe('É possível buscar um produto pelo Id', () => {
  beforeEach(() => {
    request.params = { id: ObjectId() }
  })

  describe('quando o produto é encontrado', async () => {
    before(() => {
      sinon.stub(ProductsServices, 'getById').resolves(productMock);
    });

    after(() => ProductsServices.getById.restore());

    it('usa o id recebido por params da request', async () => {
      await ProductsController.getById(request, response);
      expect(ProductsServices.getById.calledWith(request.params.id)).to.be.true;
    })

    it('chama json com o objeto do produto', async () => {
      await ProductsController.getById(request, response);
      expect(response.json.calledWith(productMock)).to.be.true;
    })
  });

  describe('quando o produto não é encontrado', async () => {
    before(() => {
      sinon.stub(ProductsServices, 'getById').resolves(errorMock);
    });

    after(() => ProductsServices.getById.restore());

    it('chama next com um objeto de error', async () => {
      await ProductsController.getById(request, response, next);
      expect(next.calledWith(errorMock)).to.be.true;
    })
  });
})

describe('É possível recuperar todos os produtos', () => {
  const productsMock = [
    { ...productMock },
    { ...productMock }
  ]

  before(() => {
    sinon.stub(ProductsServices, 'getAll').resolves(productsMock);
  });

  after(() => ProductsServices.getAll.restore());

  it('retorna um array com os produtos', async () => {
    await ProductsController.getAll(request, response);
    const { args } = response.json;
    expect(args[0][0]).to.have.property('products');
    expect(args[0][0].products).to.equal(productsMock);
  })
})

describe('É possível editar um produto', () => {
  beforeEach(() => {
    request.params = { id: ObjectId() };
    request.body = {
      name: 'Produto de Teste',
      quantity: 10
    }
  })

  describe('quando editar um produto', () => {
    before(() => {
      sinon.stub(ProductsServices, 'edit').resolves(productMock);
    });

    after(() => ProductsServices.edit.restore());

    it('deverá utilizar o id recebido em params', async () => {
      await ProductsController.edit(request, response);
      const { args } = ProductsServices.edit;
      expect(args[0][0]).to.equal(request.params.id);
      expect(args[0][1].name).to.equal(request.body.name);
      expect(args[0][1].quantity).to.equal(request.body.quantity);
    })

    it('deverá chamar json com o produto editado', async () => {
      await ProductsController.edit(request, response);
      expect(response.json.calledWith(productMock)).to.be.true;
    })
  })
})

describe('É possível remover um produto', () => {  
  beforeEach(() => {
    request.params = { id: ObjectId() };
  });

  describe('ao remover com sucesso', () => {  
    before(() => sinon.stub(ProductsServices, 'remove').resolves(productMock));
    
    after(() => ProductsServices.remove.restore());
    
    it('usa o id recebido por parametro para realizar a remoção', async () => {
      await ProductsController.remove(request, response);
      expect(ProductsServices.remove.calledWith(request.params.id)).to.be.true;
    });

    it('chama json com o produto removido', async () => {
      await ProductsController.remove(request, response);
      expect(response.json.calledWith(productMock)).to.be.true;
    })
  })

  describe('quando a remoção falhar', () => {
    before(() => sinon.stub(ProductsServices, 'remove').resolves(errorMock));
  
    after(() => ProductsServices.remove.restore());

    it('chama next com um objeto de erro', async () => {
      await ProductsController.remove(request, response, next);
      expect(next.calledWith(errorMock)).to.be.true;
    })
  })
})

// SALES

describe('É possível criar uma venda', () => {
  const itensSoldMock = [
    { productId: ObjectId(), quantity: 20 },
    { productId: ObjectId(), quantity: 15 }
  ];

  const saleMock = { _id: ObjectId(), itensSold: itensSoldMock };

  beforeEach(() => {
    request.body = itensSoldMock;
  })

  describe('quando a venda for criada com sucesso', () => {
    before(() => {
      sinon.stub(SalesServices, 'create').resolves(saleMock);
    });

    after(() => SalesServices.create.restore());

    it('utiliza informações do body para criar uma nova venda', async () => {
      await SalesController.create(request, response);
      expect(SalesServices.create.calledWith(itensSoldMock)).to.be.true;
    })

    it('json devem ser chamado com o objeto do novo produto', async () => {
      await SalesController.create(request, response);
      const { args } = response.json;
      expect(args[0][0]).to.be.a('object');
      expect(args[0][0]._id.toString()).to.equal(saleMock._id.toString());
      expect(args[0][0].itensSold).to.equal(saleMock.itensSold);
    })
  })

  describe('quando ocorrer erro na criação da venda', () => {
    before(() => sinon.stub(SalesServices, 'create').resolves(errorMock));

    after(() => SalesServices.create.restore());

    it('chama next com o objeto de erro', async () => {
      await SalesController.create(request, response, next);
      expect(next.calledWith(errorMock)).to.be.true;
    })
  });
})

describe('É possível buscar uma venda pelo Id', () => {
  const itensSoldMock = [
    { productId: ObjectId(), quantity: 20 },
    { productId: ObjectId(), quantity: 15 }
  ];

  const saleMock = { _id: ObjectId(), itensSold: itensSoldMock };

  beforeEach(() => {
    request.params = { id: ObjectId() }
  })

  describe('quando a venda é encontrada', async () => {
    before(() => {
      sinon.stub(SalesServices, 'getById').resolves(saleMock);
    });

    after(() => SalesServices.getById.restore());

    it('usa o id recebido por params da request', async () => {
      await SalesController.getById(request, response);
      expect(SalesServices.getById.calledWith(request.params.id)).to.be.true;
    })

    it('chama json com o objeto da venda', async () => {
      await SalesController.getById(request, response);
      expect(response.json.calledWith(saleMock)).to.be.true;
    })
  });

  describe('quando a venda não é encontrado', async () => {
    before(() => {
      sinon.stub(SalesServices, 'getById').resolves(errorMock);
    });

    after(() => SalesServices.getById.restore());

    it('chama next com um objeto de error', async () => {
      await SalesController.getById(request, response, next);
      expect(next.calledWith(errorMock)).to.be.true;
    })
  });
})

describe('É possível recuperar todas as vendas', () => {
  const itensSoldMock = [
    { productId: ObjectId(), quantity: 20 },
    { productId: ObjectId(), quantity: 15 }
  ];

  const saleMock = { _id: ObjectId(), itensSold: itensSoldMock };

  before(() => {
    sinon.stub(SalesServices, 'getAll').resolves([ saleMock ]);
  });

  after(() => SalesServices.getAll.restore());

  it('chama json com um array contendo as vendas', async () => {
    await SalesController.getAll(request, response);
    const { args } = response.json;
    expect(args[0][0]).to.have.property('sales');
    expect(args[0][0].sales).to.be.a('array');
    expect(args[0][0].sales[0]).to.equal(saleMock);
  })
})

describe('É possível editar uma venda', () => {
  const saleId = ObjectId();

  const updatedSale = [
    { productId: ObjectId(), quantity: 20 },
    { productId: ObjectId(), quantity: 15 }
  ];

  beforeEach(() => {
    request.params = { id: saleId };
    request.body = updatedSale;
  })

  describe('quando editar uma venda', () => {
    const editMock = {
      _id: saleId,
      itensSold: updatedSale 
    }
    
    before(() => sinon.stub(SalesServices, 'edit').resolves(editMock));

    after(() => SalesServices.edit.restore());

    it('deverá utilizar o id recebido em params', async () => {
      await SalesController.edit(request, response);
      const { args } = SalesServices.edit;
      expect(args[0][0]).to.equal(request.params.id);
      expect(args[0][1]).to.equal(request.body);
    })

    it('deverá chamar json com o produto editado', async () => {
      await SalesController.edit(request, response);
      expect(response.json.calledWith(editMock)).to.be.true;
    })
  })
})

describe('É possível remover uma venda', () => {
  const itensSoldMock = [
    { productId: ObjectId(), quantity: 20 },
    { productId: ObjectId(), quantity: 15 }
  ];

  const saleMock = { _id: ObjectId(), itensSold: itensSoldMock };

  beforeEach(() => {
    request.params = { id: saleMock._id };
  });

  describe('ao remover com sucesso', () => {  
    before(() => sinon.stub(SalesServices, 'remove').resolves(saleMock));
    
    after(() => SalesServices.remove.restore());
    
    it('usa o id recebido por parametro para realizar a remoção', async () => {
      await SalesController.remove(request, response);
      expect(SalesServices.remove.calledWith(request.params.id)).to.be.true;
    });

    it('chama json com o produto removido', async () => {
      await SalesController.remove(request, response);
      expect(response.json.calledWith(saleMock)).to.be.true;
    })
  })

  describe('quando a remoção falhar', () => {
    before(() => sinon.stub(SalesServices, 'remove').resolves(errorMock));
  
    after(() => SalesServices.remove.restore());

    it('chama next com um objeto de erro', async () => {
      await SalesController.remove(request, response, next);
      expect(next.calledWith(errorMock)).to.be.true;
    })
  })
})
