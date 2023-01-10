const rutasPath = require('../Utils/path');    
class Server { constructor() {
                    const handleError = require('../middleware/handleError');
                    const { verifyToken } = require("../middleware/Authorization");        
                    const express = require('express');
                    this.app  = express().use([require('cors')()],[express.json],[express.static('public')],[handleError]);
                    this.app.listen( process.env.PORTapp,() => {console.log('Servidor corriendo en puerto', process.env.PORTapp )});
                    this.routes(); }
                routes() {  
                    this.app.use( rutasPath.Cliente,require(rutasPath.JSCliente)); //verifyToken  
                    this.app.use( rutasPath.Cotizacion, require( rutasPath.JSCotizacion));}
} module.exports =  Server;