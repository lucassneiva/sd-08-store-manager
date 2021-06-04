const express = require('express');
const bodyParser = require('body-parser');

const { productsRouter, salesRouter } = require('./routes');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRouter);

app.use(salesRouter);

app.listen(PORT, () => console.log('O pai tá ON na porta ' + PORT));