const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./controllers/productsRouter');
const salesRouter = require('./controllers/salesRoutes');



const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/sales', salesRouter );
app.use('/products', productsRouter );

app.listen(PORT, () => {
  console.log('Online');
});