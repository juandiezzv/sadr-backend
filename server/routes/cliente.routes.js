const express = require('express');
const router = express.Router();

//Controladores
const clienteCtrl = require('../controllers/cliente.controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//Rutas
router.get('/',passport.authenticate('jwt',{session:false}),clienteCtrl.get_clientes);
router.get('/:id',clienteCtrl.get_cliente);
router.post('/',clienteCtrl.create_cliente);
router.put('/:id',clienteCtrl.edit_cliente);
router.delete('/:id', clienteCtrl.delete_cliente);
router.get('/dni/:dni',clienteCtrl.get_clienteByDNI);

module.exports = router; 

