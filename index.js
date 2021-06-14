const express = require('express');
const bodyParser =  require('body-parser');

const createProducts = require('./controllers/createProducts');


const app = express();

app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', createProducts);

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
