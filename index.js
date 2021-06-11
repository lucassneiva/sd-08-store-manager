const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const Products = require('./controllers/productsController');
const Sales = require('./controllers/salesController');

const LOCAL_PORT = 3000;
const PORT = process.env.PORT || LOCAL_PORT;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', Products);
app.use('/sales', Sales);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
