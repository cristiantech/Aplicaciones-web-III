// Middleware de tipo Error
//Creamos función que nos hará llegar
//a un middleware de tipo error:
function logError(err, req, res, next){
  console.log('primero');
 console.log(err);
 // Sistema de errores
 next(err); //mportante para saber que se esta enviando a un middleware de tipo error, si no tiene el error dentro entonces se esta mandando a uno normal
}

function boomRrrrorHandler(err, req, res, next) {
  if(err.isBoom){
    const { output} = err;
    res.status(output.statusCode).json(output.payload)
  }else{
    next(err)
  }
}


// Crear formato para devolverlo al cliente que se complementa con la función anterior:
function errrorHandler(err, req, res, next) {
  //así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
  console.log('segundo');
  res.status(500).json({
    //indicar que el error es estatus 500 Internal Server Error
    message: err.message,//mostrar al cliente el mensaje de error
    stack: err.stack //mostrar info del error
  })
}

module.exports = {logError, errrorHandler, boomRrrrorHandler}