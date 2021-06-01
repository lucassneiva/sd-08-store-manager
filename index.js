const express = require('express');
const productsControllers = require('./controllers/productsControllers');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/products/:id', productsControllers.findById);

app.get('/products', productsControllers.getAll);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsControllers.create);

app.listen(PORT, console.log(`Servidor aberto na porta ${PORT}.`));
