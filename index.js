const express = require('express');
const productController = require('./controllers/productController');
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


app.listen(PORT, () => {
  console.log('Online');
});