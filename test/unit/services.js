const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const { addProduct, getAllProductsServices, getByIdProductsServices,
  updateProductsServices, deleteProductsServices } = require('../../services/productsServices');

const salesModel = require('../../models/salesModel');
const productModel = require('../../models/productsModel');
const { addSalesServices, getAllSalesServices, findByIdSalesServices,
  updateSalesServices } = require('../../services/salesServices.js');

describe('Função de adicionar um novo produto', () => {
  before(() => {
    sinon.stub(productsModel, 'findByNameProduct')
      .resolves([]);

    sinon.stub(productsModel, 'addProduct')
    .resolves({
      _id: '60be5b5e3fb914a301cb682a',
      name: 'Bola de futebol',
      quantity: 20
    })
  });

  after(() => {
    productsModel.findByNameProduct.restore();
    productsModel.addProduct.restore();
  });

  describe('Quando inserido com sucesso', () => {
    const name = 'Bola de futebol';
    const quantity = 20;

    it('Retorna um objeto', async () => {
      const response = await addProduct(name, quantity);

      expect(response).to.be.a('object');
    });

    it('Retorna o statusCode 201', async () => {
      const response = await addProduct(name, quantity);

      expect(response.statusCode).to.equal(201);
    });
  });

  describe('Quando os dados inseridos são inválidos', () => {
    const name = 'B';
    const quantity = 0;

    it('Retorna um objeto', async () => {
      const response = await addProduct(name, quantity);

      expect(response).to.be.a('object');
    });

    it('Retorna o statusCode 422', async () => {
      const response = await addProduct(name, quantity);

      expect(response.statusCode).to.equal(422);
    })
  });
});

describe('Função GetAll, listar todos os produtos', () => {
  before(() => {
    sinon.stub(productsModel, 'getAllProducts')
    .resolves([])
  });

  after(() => {
    productsModel.getAllProducts.restore();
  });

  describe('Quando não existe nenhum produto', () => {
    it('Retorna um array', async () => {
      const response = await getAllProductsServices();

      expect(response.json.products).to.be.an('array');
    });

    it('O array está vazio', async () => {
      const response = await getAllProductsServices();

      expect(response.json.products).to.be.empty;
    });
  });
});

describe('Função de listar pelo ID', () => {
  describe('Quando o ID é inválido', () => {
    const ID = '123';

    before(() => {
      sinon.stub(productsModel, 'findByIdProducts')
      .resolves(null)
    });
  
    after(() => {
      productsModel.findByIdProducts.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await getByIdProductsServices(ID);

      expect(response).to.be.a('object');
    });

    it('Retorna statusCode 422', async () => {
      const response = await getByIdProductsServices(ID);

      expect(response.statusCode).to.equal(422);
    })
  });

  describe('Quando o ID e válido', () => {
    const ID = '60be5b5e3fb914a301cb682a';

    before(() => {
      sinon.stub(productsModel, 'findByIdProducts')
      .resolves([{
        _id: '60be5b5e3fb914a301cb682a',
        name: 'Bola de futebol',
        quantity: 20
      }]);
    });
  
    after(() => {
      productsModel.findByIdProducts.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await getByIdProductsServices(ID);

      expect(response).to.be.a('object');
    });

    it('Retorna statusCode 200', async () => {
      const response = await getByIdProductsServices(ID);

      expect(response.statusCode).to.equal(200);
    })
  })
});

describe('Função de update de produtos', () => {  
  describe('Quando atualizado com sucesso', () => {
    const { id, name, quantity } = {
      id: '60be5b5e3fb914a301cb682a',
      name: 'Bola de futebol',
      quantity: 20
    }

    before(() => {
      sinon.stub(productsModel, 'updateProducts')
      .resolves({
        _id: '60be5b5e3fb914a301cb682a',
        name: 'Bola de futebol',
        quantity: 20
      });
    });
  
    after(() => {
      productsModel.updateProducts.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await updateProductsServices(id, name, quantity);

      expect(response).to.be.a('object');
    });

    it('Retorna statusCode 200', async () => {
      const response = await updateProductsServices(id, name, quantity);

      expect(response.statusCode).to.equal(200);
    })
  });

  describe('Quando os dados são inválidos', () => {
    const { id, name, quantity } = {
      id: '60be5b5e3fb914a301cb682a',
      name: 'B',
      quantity: 0
    } 

    it('Retorna um objeto', async () => {
      const response = await addProduct(name, quantity);

      expect(response).to.be.a('object');
    });

    it('Retorna o statusCode 422', async () => {
      const response = await addProduct(name, quantity);

      expect(response.statusCode).to.equal(422);
    })
  })
});

describe('Função de deletar produtos', () => {
  describe('Quando deletado com sucesso', () => {
    const id = '60be5b5e3fb914a301cb682a';

    before(() => {
      sinon.stub(productsModel, 'deleteProducts')
      .resolves({
        message: {
          _id: '60be5b5e3fb914a301cb682a',
          name: 'Bola de futebol',
          quantity: 20
        }
      });
    });
  
    after(() => {
      productsModel.deleteProducts.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await deleteProductsServices(id);

      expect(response.json).to.be.a('object');
    });

    it('Retorna statusCode 200', async () => {
      const response = await deleteProductsServices(id);

      expect(response.statusCode).to.equal(200);
    })
  });
});

describe('Função de adicionar uma nova venda', () => {
  describe('Quando inserido com sucesso', () => {
    const data = [
      {
        productId: '5f43ba273200020b101fe49f',
        quantity: 2
      }
    ];

    before(() => {
      sinon.stub(salesModel, 'addSales')
      .resolves({
        _id: '60be5b5e3fb914a301cb682a',
        itensSold: [
          {
            productId: '5f43ba273200020b101fe49f',
            quantity: 2
          }
        ]
      });

      sinon.stub(productModel, 'findByIdProducts')
        .resolves([
          {
            name: 'Bola de futebol',
            quantity: 20
          }
        ])
    });
  
    after(() => {
      salesModel.addSales.restore();
      productModel.findByIdProducts.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await addSalesServices(data);

      expect(response).to.be.a('object');
    });

    it('Retorna o statusCode 200', async () => {
      const response = await addSalesServices(data);

      expect(response.statusCode).to.equal(200);
    });
  });

  describe('Quando os dados inseridos são inválidos', () => {
    const data = [
      {
        productId: '',
        quantity: 0
      }
    ];

    before(() => {
      sinon.stub(salesModel, 'addSales')
      .resolves({
        _id: '60be5b5e3fb914a301cb682a',
        itensSold: [
          {
            productId: '5f43ba273200020b101fe49f',
            quantity: 2
          }
        ]
      });

      sinon.stub(productModel, 'findByIdProducts')
        .resolves([
          {
            name: 'Bola de futebol',
            quantity: 20
          }
        ])
    });
  
    after(() => {
      salesModel.addSales.restore();
      productModel.findByIdProducts.restore();
    });


    it('Retorna um objeto', async () => {
      const response = await addSalesServices(data);

      expect(response).to.be.a('object');
    });

    it('Retorna o statusCode 422', async () => {
      const response = await addSalesServices(data);

      expect(response.statusCode).to.equal(422);
    })
  });
});

describe('Função de Listar todas as vendas', () => {
  before(() => {
    sinon.stub(salesModel, 'getAllSales')
    .resolves([])
  });

  after(() => {
    salesModel.getAllSales.restore();
  });

  describe('Quando não existe nenhum produto', () => {
    it('Retorna um array', async () => {
      const response = await getAllSalesServices();

      expect(response.json.sales).to.be.an('array');
    });

    it('O array está vazio', async () => {
      const response = await getAllSalesServices();

      expect(response.json.sales).to.be.empty;
    });
  });
});

describe('Função de listar pelo ID', () => {
  describe('Quando o ID é inválido', () => {
    const ID = '123';

    before(() => {
      sinon.stub(salesModel, 'findByIdSales')
      .resolves(null)
    });
  
    after(() => {
      salesModel.findByIdSales.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await findByIdSalesServices(ID);

      expect(response).to.be.a('object');
    });

    it('Retorna statusCode 404', async () => {
      const response = await findByIdSalesServices(ID);

      expect(response.statusCode).to.equal(404);
    })
  });

  describe('Quando o ID e válido', () => {
    const ID = '60be5b5e3fb914a301cb682a';

    before(() => {
      sinon.stub(salesModel, 'findByIdSales')
      .resolves([{
        _id: '60be5b5e3fb914a301cb682a',
        name: 'Bola de futebol',
        quantity: 20
      }]);
    });
  
    after(() => {
      salesModel.findByIdSales.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await findByIdSalesServices(ID);

      expect(response).to.be.a('object');
    });

    it('Retorna statusCode 200', async () => {
      const response = await findByIdSalesServices(ID);

      expect(response.statusCode).to.equal(200);
    })
  })
});

describe('Função de update de vendas', () => {  
  describe('Quando atualizado com sucesso', () => {
    const id = '60be5b5e3fb914a301cb682a';
    const data = [
      {
        productId: '5f43ba273200020b101fe49f',
        quantity: 2
      }
    ];

    before(() => {
      sinon.stub(salesModel, 'updateSales')
      .resolves({
        _id: '60be5b5e3fb914a301cb682a',
        itensSold: data,
      });
    });
  
    after(() => {
      salesModel.updateSales.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await updateSalesServices(id, data);

      expect(response).to.be.a('object');
    });

    it('Retorna statusCode 200', async () => {
      const response = await updateSalesServices(id, data);

      expect(response.statusCode).to.equal(200);
    })
  });

  describe('Quando os dados são inválidos', () => {
    const id = '60be5b5e3fb914a301cb682a';
    const data = [
      {
        productId: '',
        quantity: 0
      }
    ];

    it('Retorna um objeto', async () => {
      const response = await updateSalesServices(id, data);

      expect(response).to.be.a('object');
    });

    it('Retorna o statusCode 422', async () => {
      const response = await updateSalesServices(id, data);

      expect(response.statusCode).to.equal(422);
    })
  })
});