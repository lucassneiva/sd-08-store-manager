const express = require('express');
const bodyParser = require('body-parser');

const Product = require('./controllers/Product');
// const Sale = require('./controllers/Sale');

const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Product.getAll);
app.get('/products/:id', Product.findById);
app.post('/products', Product.create);
app.put('/products/:id', Product.update);

// app.get('/sales', Sale.getAll);
// app.post('/sales', Sale.create);

app.use(errorMiddleware);

const static_port = 3000;
const PORT = process.env.PORT || static_port;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});