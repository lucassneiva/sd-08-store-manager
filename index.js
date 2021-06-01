const express = require('express');
const bodyParser = require('body-parser');
const routerProducts = require('./controllers/productController');
const routerSales = require('./controllers/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ 
  extended: true 
}));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routerProducts);
app.use('/sales', routerSales);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});