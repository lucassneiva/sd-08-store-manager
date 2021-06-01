const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');

app.use(bodyParser.json());
app.use(productsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
