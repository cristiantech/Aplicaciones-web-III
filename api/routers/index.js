const express = require('express');
// Definimos la instacia Router
const productRouter = require('./productRouter');
const pedidosRouter = require('./router.pedidos');

const routerApi = (app) => {
  const router = express.Router();
  //Genaramos la instancia para la rutas api
  app.use('/api/v1/', router)
  // La rutas especificas
  router.use('/products', productRouter);
  router.use('/pedidos', pedidosRouter);

}


module.exports = routerApi;
