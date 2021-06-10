const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


// REQ - 01 | Cadastro e Pesquisa de Produtos
app.post('/product/');
app.get('/product/:name');
