var express = require('express')
var cors = require('cors')
var app = express();
var handleError = require('./middleware/handleError')
var Router =  require('./routes/Index');
require('dotenv').config()
const porPORTmain = process.env.PORTmain || 4800;

// constructor use app
app.use(cors());
app.use(express.json());
app.use('/API',Router);
app.use(handleError); //manejo de error status async

// lanzar al puerto 
app.listen(porPORTmain, ()=>{
  console.log(` 🚀 Server API is running on port ${porPORTmain}`);
});
