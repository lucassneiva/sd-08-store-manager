const express = require('express');
const productRoute = require('./routes/productRoute');

const app = express();
const port = 3000;

app.use(express.json());
app.use(productRoute);

app.listen(port, () => {
  console.log('App ouvindo a porta 3000!');
});




// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
