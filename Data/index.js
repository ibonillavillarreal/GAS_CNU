const cliente = require('./Cliente')
require('dotenv').config()
const conexion = require('../Config/Cnx')

module.exports = {
  DBCliente: cliente(conexion)
}