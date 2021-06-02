const express = require('express');
const bodyParser = require('body-parser');
const productsRouters = require('./routers/productsRouters');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRouters);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
