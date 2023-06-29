/*
*Creacion de un aplicacion API que nos permita consumir los recursos establecidos
*RestFULL
*/
const express = require('express');
const routerApi = require('./src/routers');

// middleware Error
const {logError, errrorHandler, boomRrrrorHandler} = require('./src/middleware/error.handelr');
const { use } = require('./src/routers/productRouter');
// Genearmos una instancia de APP
const app = express();
//Puerto
const port = 3001;
// middleware de express propio
app.use(express.json());
//Rutas o outing


app.get('/', (req,res) => {
  const user = req.locals.user;
  res.json({
    status : "ok",
    user
  });
});
// Instancia a routers
routerApi(app);

// after Routing Los middlewares de tipo error siempre deben ir después de definir el routing.
app.use(logError);
app.use(boomRrrrorHandler);
app.use(errrorHandler);









app.listen(port, () => {console.log(`listening in the port: ${port}`)});
