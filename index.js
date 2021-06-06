const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const middlewares = require('./middlewares');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);
app.use(middlewares.erro);

app.listen(PORT, () => console.log('ONLINE!!!'));
