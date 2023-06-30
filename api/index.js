/*
*Creacion de un aplicacion API que nos permita consumir los recursos establecidos
*RestFULL
*/
const express = require('express');
const cors = require('cors');
const routerApi = require('./routers');


// middleware Error
const {logError, errrorHandler, boomRrrrorHandler} = require('./middleware/error.handelr');
// Genearmos una instancia de APP
const app = express();
//Puerto
const port = process.env.PORT || 3000;
// middleware de express propio
app.use(express.json());
// Implementación de CORS
const whitelist = ['http://localhost:5500/', 'http://217.0.0.1:8080']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));


//Rutas o outing
app.get('/api', (req,res) => {
    res.json({
    status : "ok"
  });
});
// Instancia a routers
routerApi(app);

// after Routing Los middlewares de tipo error siempre deben ir después de definir el routing.
app.use(logError);
app.use(boomRrrrorHandler);
app.use(errrorHandler);









app.listen(port, () => {console.log(`listening in the port: ${port}`)});
