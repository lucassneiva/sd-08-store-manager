const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/test', async(req,res) => {
  res.send('ola');
});
app.use('/products', require('./controllers/productsController'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));