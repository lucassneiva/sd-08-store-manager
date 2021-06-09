require('dotenv').config();

const express = require('express');

const products = require('./controllers/Products');
const errorMiddleware = require('./middlewares/error');

const app = express();

const DEFAULT_PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', products.create);
app.get('/products/:id', products.findById);
app.put('/products/:id', products.update);
app.delete('/products/:id', products.remove);
app.get('/products', products.findAll);

app.use(errorMiddleware);

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT);
