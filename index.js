const express = require('express');
const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.json());

const { routeProduct } = require('./routes/product');
const { routeSales } = require('./routes/sales');

const PORT = 3000;


app.use(routeProduct);
app.use(routeSales);


app.listen(PORT, () => console.log('App ouvindo a porta 3000!'));










// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
