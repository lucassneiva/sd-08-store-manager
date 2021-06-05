require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const products = require('./controllers/products');
const errorMiddleware = require('./middlewares/error');

const app = express();

const PORT_3000 = process.env.PORT;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', products.createOne);

app.use(errorMiddleware);

app.listen(
  process.env.PORT || PORT_3000,
  () => console.log(`Server listening on port ${process.env.PORT || PORT_3000}`)
);
