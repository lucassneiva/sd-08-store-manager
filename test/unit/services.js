const { expect } = require('chai');
const sinon = require('sinon');

const ProductModel = require('../../models/productsModel');
const SaleModel = require("../../models/salesModel");

const ProductService = require('../../services/productsService');
const SaleService = require('../../services/salesService');

describe('productService.js', () => {
  const payload = {
    name: "Produto de teste",
    quantity: 5
  };

  describe('Criando produtos no BD', () => {
    describe('Em caso de erros', async () => {
      const payloadMovie = {};

      it('o erro retorna um objeto', async () => {
        const response = await ProductService.createProduct(payloadMovie);
        expect(response).to.be.a('object');
      });
      it('o erro contém uma mensagem', async () => {
        const response = await ProductService.createProduct(payloadMovie);
        expect(response).to.have.property('err');
        expect(response.err).to.have.property('message');
      });
      it('a mensagem devera ser uma sting', async () => {
        const { err } = await ProductService.createProduct(payloadMovie);
        expect(err.message).to.be.a('string');
      });
      it('a mensagem devera ter a resposta correspondente ao erro', async () => {
        const { err } = await ProductService.createProduct(payloadMovie);
        expect(err.message).to.include('Product already exists');
      });
    });

    describe('Em caso de exito', async () => {
      before(() => {
        const ID_EXAMPLE = '604cb554311d68f491ba5781';

        sinon.stub(ProductModel, 'createProduct')
          .resolves({
            _id: ID_EXAMPLE, ...payload
          });
      });
      after(() => {
        ProductModel.createProduct.restore();
      });

      it('o retorno e um objeto', async () => {
        const response = await ProductService.createProduct(payload);
        expect(response).to.be.a('object');
      });
      it('o objeto contem tres propriedades', async () => {
        const response = await ProductService.createProduct(payload);
        expect(response).to.have.property('_id');
        expect(response).to.have.property('name');
        expect(response).to.have.property('quantity');
      });

    });
  })

  describe('Buscando todos os produtos', () => {

    describe('Quando nao ha produtos', () => {
      before(() => {
        sinon.stub(ProductModel, 'getAllProducts')
          .resolves({
            "products": []
          })
      })
      after(() => {
        ProductModel.getAllProducts.restore();
      })

      it('retorna um objeto', async () => {
        const result = await ProductService.getAllProducts();
        expect(result).to.be.a('object');
      })
      it('o objeto tem um array vazio', async () => {
        const { products } = await ProductService.getAllProducts();
        expect(products).to.be.a('array');
        expect(products).to.have.lengthOf(0);
      })
    })

    describe('Quando ha produtos', () => {
      before(() => {
        sinon.stub(ProductModel, 'getAllProducts')
          .resolves({
            "products": [
              {
                _id: "60cfb7c018e50a3c56edce12",
                name: "Teste",
                quantity: 2
              }
            ]
          })
      })
      after(() => {
        ProductModel.getAllProducts.restore();
      })

      it('retorna um objeto', async () => {
        const result = await ProductService.getAllProducts();
        expect(result).to.be.a('object');
      })
      it('o objeto tem um array diferente de zero', async () => {
        const { products } = await ProductService.getAllProducts();
        expect(products).to.be.a('array');
        expect(products).to.not.have.lengthOf(0);
      })
      it('o retorno possui as informacoes do produto', async () => {
        const { products } = await ProductService.getAllProducts();
        expect(products[0]).to.have.all.keys('_id', 'name', 'quantity');
      })
    })
  })

  describe('Buscando um produto pelo ID', () => {

    describe('Quando o Id e invalido', () => {
      before(() => {
        sinon.stub(ProductModel, 'findProduct')
          .resolves({
            "err": {
              "code": "invalid_data",
              "message": "Wrong id format"
            }
          })
      })
      after(() => {
        ProductModel.findProduct.restore();
      })

      it('retorna um objeto', async () => {
        const result = await ProductService.findProduct();
        expect(result).to.be.a('object');
      })
      it('o objeto possui um erro', async () => {
        const { err } = await ProductService.findProduct();
        expect(err).to.have.all.keys('code', 'message');
        expect(err.message).to.include('Wrong id format');
      })
    })

    describe('Quando o ID e valido', () => {
      before(() => {
        sinon.stub(ProductModel, 'findProduct')
          .resolves({
            "_id": "60cfbafc0af3013dd1d621a4",
            "name": "Teste",
            "quantity": 2
          })
      })
      after(() => {
        ProductModel.findProduct.restore();
      })

      it('retorna um objeto', async () => {
        const result = await ProductService.findProduct();
        expect(result).to.be.a('object');
      })
      it('o retorno possui as informacoes do produto', async () => {
        const result = await ProductService.findProduct();
        expect(result).to.have.all.keys('_id', 'name', 'quantity');
      })
    })
  })

  describe('Atualizando um produto', () => {
    const updatedProduct = {
      _id: '604cb554311d68f491ba5781',
      name: 'new_name',
      quantity: 10
    };
    before(() => {
      sinon.stub(ProductModel, 'updateProduct')
        .resolves(updatedProduct);
    });

    after(() => {
      ProductModel.updateProduct.restore();
      sinon.restore();
    });

    it('retorna um objeto com o valor atualizado', async () => {
      const product = await ProductService.createProduct(payload);
      const response = await ProductService.updateProduct(product._id, updatedProduct);
      expect(response).to.be.an('object');
      expect(response).to.have.a.property('name', updatedProduct.name);
    })
  })

  describe('Deletando um produto', () => {
    before(() => {
      sinon.stub(ProductModel, 'deleteProduct')
        .resolves(payload);
    });

    after(() => {
      ProductModel.deleteProduct.restore();
      sinon.restore();
    });

    it('retorna um objeto com o valor deletado', async () => {
      const product = await ProductService.createProduct(payload);
      const response = await ProductService.deleteProduct(product._id);
      expect(response).to.be.an('object');
    })
  })
});

describe('saleService.js', () => {
  const salePayload = [
    { productId: '60cfb7c018e50a3c56edce12', quantity: 10 }
  ];
  const productPayload = {
    _id: '60cfb7c018e50a3c56edce12',
    name: 'teste',
    quantity: 100
  };

  describe('Criando uma venda', () => {
    before(() => {
      sinon.stub(SaleModel, 'createSale')
        .resolves({ _id: '1', itensSold: salePayload });
    })
    after(() => {
      SaleModel.createSale.restore();
    })
    it('Venda criada com sucesso retorna um objeto', async () => {
      const result = await SaleService.createSale(salePayload);
      expect(result).to.be.an('object');
      expect(result).to.have.a.property('_id');
    })
  })

  describe('Buscando todas as vendas', () => {
    before(() => {
      sinon.stub(SaleModel, 'getAllSales')
        .resolves([{ _id: '1', itensSold: salePayload }]);
    })
    after(() => {
      SaleModel.getAllSales.restore();
    })
    it('retorna um array de objetos', async () => {
      const result = await SaleService.getAllSales();
      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    })
  })

  describe('Buscando uma venda pelo ID', () => {
    before(() => {
      sinon.stub(SaleModel, 'findSale')
        .resolves({
          "_id": "5f43ba333200020b101fe4a0",
          "itensSold": [salePayload]
        })
    })
    after(() => {
      SaleModel.findSale.restore();
    })

    it('retorna um objeto', async () => {
      const result = await SaleService.findSale('5f43ba333200020b101fe4a0');
      expect(result).to.be.a('object');
    })
    it('o retorno possui as informacoes da venda', async () => {
      const result = await SaleService.findSale('5f43ba333200020b101fe4a0');
      expect(result).to.have.all.keys('_id', 'itensSold');
    })
  })

  describe('Atualizando uma venda', () => {
    const updatedSale = [
      {
        productId: '604cb554311d68f491ba5781',
        quantity: 11
      },
      {
        productId: '604cb554311d68f491ba5785',
        quantity: 12
      },
    ];
    const salePayload = [
      { productId: '60cfb7c018e50a3c56edce12', quantity: 10 }
    ];
    before(() => {
      sinon.stub(SaleModel, 'updateSale')
        .resolves({ _id: '2', itensSold: updatedSale });
    });

    after(() => {
      SaleModel.updateSale.restore();
      sinon.restore();
    });

    it('retorna um objeto com o valor atualizado', async () => {
      //const product = await SaleService.createSale(salePayload);
      const { itensSold } = await SaleService.updateSale('2', updatedSale);
      expect(itensSold).to.be.an('array');
      expect(itensSold[0]).to.be.an('object');
      expect(itensSold[0]).to.have.a.property('productId', updatedSale[0].productId);
    })
  })

  describe('Deletando um produto', () => {
    const deletedSale = [
      {
        productId: '604cb554311d68f491ba5781',
        quantity: 11
      },
      {
        productId: '604cb554311d68f491ba5785',
        quantity: 12
      },
    ];
    before(() => {
      sinon.stub(SaleModel, 'deleteSale')
        .resolves({ _id: '2', itensSold: deletedSale });
    });

    after(() => {
      SaleModel.deleteSale.restore();
      sinon.restore();
    });

    it('retorna um objeto com o valor deletado', async () => {
      const response = await SaleService.deleteSale('2');
      expect(response).to.be.an('object');
    })
  })
});

