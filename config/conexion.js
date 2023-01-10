
require('dotenv').config()
const conexion = {
    user:'sa',
    password:'123',
    database:'GAS_CNU',
    server:'DESKTOP-S1FMAIS',
     options:{
         trustedconnection:false,
         enableArithAbort:true,
         encrypt:false
     }
}

const conexionDB2 = {
    user:'sa',
    password:'***',
    database:'***',    
    server:'192.168.1.**',
     options:{
         trustedconnection:false,
         enableArithAbort:true,
         encrypt:false
     }
}



module.exports =conexion;