const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

const products = require('./src/controllers/ProductsController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', products.getAll);
app.post('/products', products.create);

app.listen(process.env.PORT || PORT, () => console.log('Fala que eu te escuto!'));
