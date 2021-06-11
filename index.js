const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers');

const app = express();

const PORT_NUMBER = 3000;

app.use(bodyParser.json());
app.use(router);

app.listen(PORT_NUMBER, () => console.log('Listen to port 3000'));

app.get('/teste', (_req, res) => {
  res.send('Teste');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
