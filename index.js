const express = require('express');
const bodyParser = require('body-parser');

const ProductsController = require('./controllers/productsControllers');
const SalesController = require('./controllers/salesControllers');

const app = express();

app.use(bodyParser.json());

app.use('/products', ProductsController);
app.use('/sales', SalesController);

const PORT_NUMBER = 3000;

const PORT = process.env.PORT || PORT_NUMBER;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
