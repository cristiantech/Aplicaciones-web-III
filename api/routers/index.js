const express = require('express');
// Definimos la instacia Router
const productRouter = require('./productRouter')

const routerApi = (app) => {
  const router = express.Router();
  //Genaramos la instancia para la rutas api
  app.use('/api/v1/', router)
  // La rutas especificas
  router.use('/products', productRouter);

}


module.exports = routerApi;
