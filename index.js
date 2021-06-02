const express = require('express');
const productController = require('./controllers/productController');

const app = express();

const PORT = '3000';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.cadastrarProduto);

app.listen(PORT, () => {
  console.log('Online');
});