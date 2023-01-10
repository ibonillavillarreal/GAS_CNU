var express = require('express')
var cors = require('cors')
var app = express();
var handleError = require('./middleware/handleError')
var Router =  require('./routes/Index');
require('dotenv').config()
app.use(cors());
app.use(express.json());
app.use('/API',Router);

app.use(handleError);
const porPORTmain = process.env.PORTmain || 4800;
app.listen(porPORTmain, ()=>{
  console.log(` 🚀 Server API is running on port ${porPORTmain}`);
});


