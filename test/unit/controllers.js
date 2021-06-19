const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');

const ProductsController = require('../../controllers/productController');
const ProductsServices = require('../../services/productsService');

const SalesController = require('../../controllers/salesController');
const SalesServices = require('../../services/salesService');

let request, response, next;

const product = {
  _id: ObjectId(),
  name: "Teste",
  quantity: 10
}

const error = {
  err: {}
}

beforeEach(() => {
  request = {};
  response = {};
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns();
  next = sinon.stub().returns();
})

describe('Criando produto:', () => {
  beforeEach(() => {
    request.body = {
      name: "Teste",
      quantity: 10
    };
  })

  describe('Criado com sucesso', () => {

    before(() => {
      sinon.stub(ProductsServices, 'createProduct').resolves(product);
    });

    after(() => ProductsServices.createProduct.restore());

    it('usa o body para criar um produto', async () => {
      await ProductsController.createProduct(request, response);
      const { args } = ProductsServices.createProduct;
      expect(args[0][0]).to.be.a('object');
      expect(args[0][0].name).to.equal(request.body.name);
      expect(args[0][0].quantity).to.equal(request.body.quantity);
    })

    it('status deve ser chamado com 201', async () => {
      await ProductsController.createProduct(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    })

    it('json devem ser chamado com o objeto do novo produto', async () => {
      await ProductsController.createProduct(request, response);
      expect(response.json.calledWith(product)).to.be.true;
    })
  })

  describe('erro na criação de um produto', () => {
    before(() => sinon.stub(ProductsServices, 'createProduct').resolves(error));

    after(() => ProductsServices.createProduct.restore());

    it('erro retorna status 422', async () => {
      await ProductsController.createProduct(request, response, next);
      expect(response.status.calledWith(422)).to.be.true;
    })
  });
})

describe('Busca de produto por ID', () => {
  beforeEach(() => {
    request.params = { id: ObjectId() }
  })

  describe('Produto encontrado', async () => {
    before(() => {
      sinon.stub(ProductsServices, 'findProduct').resolves(product);
    });

    after(() => ProductsServices.findProduct.restore());

    it('usa o id recebido por params da request', async () => {
      await ProductsController.findProduct(request, response);
      expect(ProductsServices.findProduct.calledWith(request.params.id)).to.be.true;
    })

    it('chama json com o objeto do produto', async () => {
      await ProductsController.findProduct(request, response);
      expect(response.json.calledWith(product)).to.be.true;
    })
  })

  describe('Produto não encontrado', async () => {
    before(() => {
      sinon.stub(ProductsServices, 'findProduct').resolves(error);
    });

    after(() => ProductsServices.findProduct.restore());

    it('erro retorna status 422', async () => {
      await ProductsController.findProduct(request, response, next);
      expect(response.status.calledWith(422)).to.be.true;
    })
  });
})

describe('Buscar todos os produtos', () => {
  const products = [
    { ...product },
    { ...product }
  ]

  before(() => {
    sinon.stub(ProductsServices, 'getAllProducts').resolves(products);
  });

  after(() => ProductsServices.getAllProducts.restore());

  it('retorna um array com os produtos', async () => {
    await ProductsController.getAllProducts(request, response);
    const { args } = response.json;
    expect(args[0][0][0]).to.have.property('name');
    expect(args[0][0][0]).to.equal(products[0]);
  })
})

describe('Editar um produto', () => {
  beforeEach(() => {
    request.params = { id: ObjectId() };
    request.body = {
      name: 'Teste',
      quantity: 10
    }
  })

  describe('quando editar um produto', () => {
    before(() => {
      sinon.stub(ProductsServices, 'updateProduct').resolves(product);
    });

    after(() => ProductsServices.updateProduct.restore());

    it('deverá utilizar o id recebido em params', async () => {
      await ProductsController.updateProduct(request, response);
      const { args } = ProductsServices.updateProduct;
      expect(args[0][0]).to.equal(request.params.id);
      expect(args[0][1].name).to.equal(request.body.name);
      expect(args[0][1].quantity).to.equal(request.body.quantity);
    })

    it('deverá chamar json com o produto editado', async () => {
      await ProductsController.updateProduct(request, response);
      expect(response.json.calledWith(product)).to.be.true;
    })
  })
})

describe('É possível remover um produto', () => {
  beforeEach(() => {
    request.params = { id: ObjectId() };
  });

  describe('ao remover com sucesso', () => {
    before(() => sinon.stub(ProductsServices, 'deleteProduct').resolves(product));

    after(() => ProductsServices.deleteProduct.restore());

    it('usa o id recebido por parametro para realizar a remoção', async () => {
      await ProductsController.deleteProduct(request, response);
      expect(ProductsServices.deleteProduct.calledWith(request.params.id)).to.be.true;
    });

    it('chama json com o produto removido', async () => {
      await ProductsController.deleteProduct(request, response);
      expect(response.json.calledWith(product)).to.be.true;
    })
  })

  describe('quando a remoção falhar', () => {
    before(() => sinon.stub(ProductsServices, 'deleteProduct').resolves(error));

    after(() => ProductsServices.deleteProduct.restore());

    it('retorna erro 422', async () => {
      await ProductsController.deleteProduct(request, response, next);
      expect(response.status.calledWith(422)).to.be.true;
    })
  })
})

describe('É possível criar uma venda', () => {
  const itensSold = [
    { productId: ObjectId(), quantity: 10 },
    { productId: ObjectId(), quantity: 5 }
  ];

  const saleMock = { _id: ObjectId(), itensSold: itensSold };

  beforeEach(() => {
    request.body = itensSold;
  })

  describe('quando a venda for criada com sucesso', () => {
    before(() => {
      sinon.stub(SalesServices, 'createSale').resolves(saleMock);
    });

    after(() => SalesServices.createSale.restore());

    it('utiliza informações do body para criar uma nova venda', async () => {
      await SalesController.createSale(request, response);
      expect(SalesServices.createSale.calledWith(itensSold)).to.be.true;
    })

    it('json devem ser chamado com o objeto do novo produto', async () => {
      await SalesController.createSale(request, response);
      const { args } = response.json;
      expect(args[0][0]).to.be.a('object');
      expect(args[0][0]._id.toString()).to.equal(saleMock._id.toString());
      expect(args[0][0].itensSold).to.equal(saleMock.itensSold);
    })
  })

  describe('quando ocorrer erro na criação da venda', () => {
    before(() => sinon.stub(SalesServices, 'createSale').resolves(error));

    after(() => SalesServices.createSale.restore());

    it('retorna erro 422', async () => {
      await SalesController.createSale(request, response, next);
      expect(response.status).to.be.a('function');
    })
  });

  describe('É possível buscar uma venda pelo Id', () => {
    const itensSold = [
      { productId: ObjectId(), quantity: 10 },
      { productId: ObjectId(), quantity: 5 }
    ];

    const saleMock = { _id: ObjectId(), itensSold: itensSold };

    beforeEach(() => {
      request.params = { id: ObjectId() }
    })

    describe('quando a venda é encontrada', async () => {
      before(() => {
        sinon.stub(SalesServices, 'findSale').resolves(saleMock);
      });

      after(() => SalesServices.findSale.restore());

      it('usa o id recebido por params da request', async () => {
        await SalesController.findSale(request, response);
        expect(SalesServices.findSale.calledWith(request.params.id)).to.be.true;
      })

      it('chama json com o objeto da venda', async () => {
        await SalesController.findSale(request, response);
        expect(response.json.calledWith(saleMock)).to.be.true;
      })
    });

    describe('quando a venda não é encontrado', async () => {
      before(() => {
        sinon.stub(SalesServices, 'findSale').resolves(error);
      });

      after(() => SalesServices.findSale.restore());

      it('chama next com um objeto de error', async () => {
        await SalesController.findSale(request, response, next);
        expect(response.status.calledWith(404)).to.be.true;
      })
    });
  })

  describe('É possível recuperar todas as vendas', () => {
    const itensSold = [
      { productId: ObjectId(), quantity: 10 },
      { productId: ObjectId(), quantity: 5 }
    ];

    const saleMock = { _id: ObjectId(), itensSold: itensSold };

    before(() => {
      sinon.stub(SalesServices, 'getAllSales').resolves([saleMock]);
    });

    after(() => SalesServices.getAllSales.restore());

    it('chama json com um array contendo as vendas', async () => {
      await SalesController.getAllSales(request, response);
      const { args } = response.json;
      expect(args[0][0][0]).to.have.property('itensSold');
      expect(args[0][0][0].itensSold).to.be.a('array');
      expect(args[0][0][0]).to.equal(saleMock);
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

    // describe('quando editar uma venda', () => {
    //   const editMock = {
    //     _id: saleId,
    //     itensSold: updatedSale
    //   }

    //   before(() => sinon.stub(SalesServices, 'updateSale').resolves(editMock));

    //   after(() => SalesServices.updateSale.restore());

    //   it('deverá utilizar o id recebido em params', async () => {
    //     await SalesController.updateSale(request, response);
    //     const { args } = SalesServices.updateSale;
    //     expect(args[0][0]).to.equal(request.params.id);
    //     expect(args[0][1]).to.equal(request.body);
    //   })

    //   it('deverá chamar json com o produto editado', async () => {
    //     await SalesController.updateSale(request, response);
    //     expect(response.json.calledWith(editMock)).to.be.true;
    //   })
    // })
  })


  describe('É possível remover uma venda', () => {
    const itensSold = [
      { productId: ObjectId(), quantity: 10 },
      { productId: ObjectId(), quantity: 5 }
    ];

    const saleMock = { _id: ObjectId(), itensSold: itensSold };

    beforeEach(() => {
      request.params = { id: saleMock._id };
    });

    describe('ao remover com sucesso', () => {
      before(() => sinon.stub(SalesServices, 'deleteSale').resolves(saleMock));

      after(() => SalesServices.deleteSale.restore());

      it('usa o id recebido por parametro para realizar a remoção', async () => {
        await SalesController.deleteSale(request, response);
        expect(SalesServices.deleteSale.calledWith(request.params.id)).to.be.true;
      });

      it('chama json com o produto removido', async () => {
        await SalesController.deleteSale(request, response);
        expect(response.json.calledWith(saleMock)).to.be.true;
      })
    })

    describe('quando a remoção falhar', () => {
      before(() => sinon.stub(SalesServices, 'deleteSale').resolves(error));

      after(() => SalesServices.deleteSale.restore());

      it('chama next com um objeto de erro', async () => {
        await SalesController.deleteSale(request, response, next);
        expect(response.status.calledWith(422)).to.be.true;
      })
    })
  })
})
