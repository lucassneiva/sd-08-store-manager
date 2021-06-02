const express = require('express');
const bodyParser = require('body-parser');

const { productsRouter } = require('./routes');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

//  app.use daqui pra baixo
app.use(productsRouter);

app.listen(PORT, () => console.log('O pai tá ON na porta ' + PORT));