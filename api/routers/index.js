const express = require('express');
// Definimos la instacia Router
const productosRouter = require('./productos.router');
const pedidosRouter = require('./pedidos.router');
const usuariosRouter = require('./usuarios.router');
const categoriasRouter = require('./categorias.router');
const detallePedidoRouter = require('./detalles_pedido.router');
// const productosCatgorias = require('./productos_categorias.router');

const routerApi = (app) => {
  const router = express.Router();
  //Genaramos la instancia para la rutas api
  app.use('/api/v1/', router)
  // La rutas especificas
  router.use('/productos', productosRouter);
  router.use('/usuarios', usuariosRouter);
  router.use('/categorias', categoriasRouter);
  router.use('/pedidos', pedidosRouter);
  router.use('/detalles', detallePedidoRouter);
  // router.use('/producategoria', productosCatgorias);
}


module.exports = routerApi;
