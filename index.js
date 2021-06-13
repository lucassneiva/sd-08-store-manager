const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/products', require('./controllers/productsController'));

const PORT = 3000;

app.listen(PORT, () => console.log(`App ouvindo a porta ${PORT}!`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
