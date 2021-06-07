const express = require('express');
const app = express();
app.use(express.json());




// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


const router = require('./routes');

// extrict mode so deu certo assim, sem '/products' não encontrou o endpoint+verbo
app.use('/products', router.productsRoutes);
app.use('/sales', router.salesRoutes);


const porta = 3000;
app.listen(porta, ()=> {
  console.log('online, escutando a porta: 3000' );
});