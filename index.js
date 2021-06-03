require('dotenv').config();
const express = require('express');
const middlewares = require('./middlewares');
const products = require('./routes/products');
const app = express();

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);

app.use(middlewares.error);

app.listen(PORT, () => console.log(`Tudo certo na porta ${PORT}`));
