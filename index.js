const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const productsRoutes = require('./routes/productsRoutes');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(productsRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
