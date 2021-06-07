const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const Products = require('./controllers/productsController');

const LOCAL_PORT = 3000;
const PORT = process.env.PORT || LOCAL_PORT;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', Products);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
