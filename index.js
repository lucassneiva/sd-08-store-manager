const express = require('express');
const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', productsControllers.findById);

app.get('/products', productsControllers.getAll);

app.post('/products', productsControllers.create);

app.put('/products/:id', productsControllers.updateOne);

app.delete('/products/:id', productsControllers.deleteOne);

app.post('/sales', salesControllers.create);

app.get('/sales', salesControllers.getAll);

app.get('/sales/:id', salesControllers.findById);

app.listen(PORT, console.log(`Servidor aberto na porta ${PORT}.`));
