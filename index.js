const express = require('express');
const app = express();
const route = require('./routes/route');

const port = 3000;

app.use(express.json());
app.use(route);

app.listen(port, () => {
  console.log('tamo on, clã aoooow');
});


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
