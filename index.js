const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const products = require('./controllers/productController');


const PORT = 3000;
app.use(bodyParser.json());


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.post('/products',products.addProducts);
app.get('/products',products.getAll);
app.get('/products/:id',products.getOne);
app.put('/products/:id',products.updateOne);
app.delete('/products/:id',products.deleteOne);




app.listen(PORT,()=>console.log(`Rodando na porta :${PORT}`));