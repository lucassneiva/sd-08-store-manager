// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/', route);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
