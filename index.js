const express = require('express');
const app = express();
const route = require('./src/routes/routes');

const PORT = 3000;

app.use(express.json());
app.use(route);

app.listen(PORT, () => {
  console.log('Fala que eu te escuto');
});


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
