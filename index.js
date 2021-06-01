const express = require('express');
require('dotenv').config();

const productsRoutes = require('./routes/productsRoutes.js');
const salesRoutes = require('./routes/salesRoutes.js');

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use(productsRoutes);
app.use(salesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Escutando porta ${PORT}`); });
