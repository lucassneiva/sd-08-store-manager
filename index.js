const express = require('express');
const bodyParser = require('body-parser');

const products = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());

const LOCAL_PORT = 3000;

const PORT = process.env.PORT || LOCAL_PORT;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
