const express = require('express');
const bodyParser = require('body-parser');

const productRouter = require('./routes/productRouter');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.listen(PORT, () => {
  console.log('Servidor conectado na porta 3000!');
});
