require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const products = require('./controllers/products');
const errorMiddleware = require('./middlewares/error');

const app = express();

const DEFAULT_PORT = 3000;
// const DB_PORT = 27017;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', products.createOne);

app.use(errorMiddleware);

app.listen(
  process.env.PORT || DEFAULT_PORT,
  () => console.log(`Server listening on port ${process.env.PORT || DEFAULT_PORT}`)
);
