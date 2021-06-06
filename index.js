const express = require('express');
const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.json());

const {routeProduct} = require('./Routes/product');

const PORT = 3000;


app.use('/products', routeProduct);

app.listen(PORT, () => console.log('App ouvindo a porta 3000!'));










// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
