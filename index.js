const express = require('express');
const errorMiddleware = require('./controller/errorMiddleware');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
const productsRoute = require('./routes/productsRoutes');

app.use(bodyParser.json());
app.use('/products', productsRoute);

app.use(errorMiddleware);

app.listen(PORT, () => console.log('App ouvindo a porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
