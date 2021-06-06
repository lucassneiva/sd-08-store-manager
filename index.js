const express = require('express');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.cadastrarProduto);

app.get('/products', productController.listarProdutos);

app.get('/products/:id', productController.buscarProdutoPorId);

app.put('/products/:id', productController.atualizarProdutoPorId);

app.delete('/products/:id', productController.deletarProdutoPorId);

app.post('/sales', salesController.cadastraVenda);

app.get('/sales', salesController.listarVendas);

app.get('/sales/:id', salesController.buscarVendaPorId);

app.listen(PORT, () => {
  console.log('Online');
});