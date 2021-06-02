const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const middlewareErro = require('./middlewares/erro');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);
app.use(middlewareErro);

app.listen(PORT, () => console.log('ONLINE!!!'));
