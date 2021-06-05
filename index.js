const express = require('express');
const bodyParser = require('body-parser');

const { productsRouter, salesRouter } = require('./routes');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRouter);

app.use(salesRouter);

app.listen(PORT, () => console.log('O pai tá ON na porta ' + PORT));