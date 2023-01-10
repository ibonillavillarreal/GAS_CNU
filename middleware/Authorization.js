const http = require('http');
const { resolve } = require('path');
const { rejects } = require('assert');


function verifyToken(req, res, next) {
    const tkn = req.headers['x-auth-token']; 
    let data = '';
    return new Promise((resolve, rejects) => {
        http.get('http://192.168.1.17:3000/verify/' + tkn, (res) => {
            res.on('data', (chunk) => {
                data += chunk;
                if (data === 'true')
                   next()
                else
                return false;
            });
        })
    })
}

module.exports = {
    verifyToken: verifyToken
}