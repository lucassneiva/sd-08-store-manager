const express = require('express');
const productRoute = require('./routes/productRoute'); 
const saleRoute = require('./routes/saleRoute'); 

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productRoute);
app.use(saleRoute);

app.listen(PORT, () => {
  console.log(`ouvindo a porta ${PORT}`);
});
