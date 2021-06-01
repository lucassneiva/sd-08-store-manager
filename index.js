const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use('bodyParser')

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
