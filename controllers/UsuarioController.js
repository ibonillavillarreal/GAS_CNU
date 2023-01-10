"use strict"
const DICTIONARY_KEYS = require('../Utils/DICTIONARY_KEYS')
const conexion = require('../config/conexion');
const sql = require('mssql');
//
require('dotenv').config()
const { response, request } = require('express');


const usuariosGet = (req = request, res = response,next) => {
    try {
        res.json({msg: 'get API - controlador' });  
    } catch (error) {
        next(error)
    }
}

const usuariosPost = (req, res = response,next) => {
    try {
        const { nombre, edad } = req.body;
        res.json({ msg: 'post API - usuariosPost' });
    } catch (error) {
        next(error)
    }
}

const usuariosPut = (req, res = response,next) => {
    try {
            const { id } = req.params;
            res.json({msg: 'put API - usuariosPut'});
    } catch (error) {
        next(error)
    }

}

const usuariosPatch = (req, res = response) => {
    try {
        res.json({
        msg: 'patch API - usuariosPatch' });
    } catch (error) {
        next(error)
    }
}

const usuariosDelete = (req, res = response) => {
    try {
    res.json({ msg: 'delete API - usuariosDelete' });
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}
