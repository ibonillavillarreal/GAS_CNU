const  { handleError }  = require('../Utils/errorHandler')

module.exports = async (err,req, res, next)=>{
  handleError(err, res);
}