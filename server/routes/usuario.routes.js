const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

//Registro
router.post('/registro', (req,res,next) =>{
    
    let nuevoUsuario = new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        username: req.body.username,
        password: req.body.password
    });

    Usuario.agregarUsuario(nuevoUsuario, (err, usuario)=>{
        if(err){
            res.json({
                success: false,
                msg: 'Fallo al registrar al nuevo usuario',
                nombre:nuevoUsuario.username
            });
        } else {
            res.json({
                success: true,
                msg: 'Usuario Registrado',
                
            });
        }
    });
});


router.post('/autenticacion', (req,res,next) =>{
   const username = req.body.username;
   const password = req.body.password; 

    Usuario.get_UsuarioByUsername(username, (err, usuario)=>{
        if(err) throw err;
        if(!usuario){
            return res.json({success: false, msg: "Usuario no Encontrado" });
        }
        
        Usuario.compararPassword(password, usuario.password, (err, esIgual)=>{
            if(err) throw err;
            if(esIgual){
                const token = jwt.sign(usuario.toJSON(), "BD3", {
                    expiresIn: 604800 //1 semana
                });
                res.json({
                    success: true,
                    token: 'JWT '+ token,
                    usuario:{
                        id: usuario._id,
                        nombre: usuario.nombre,
                        correo: usuario.correo
                    }
                });
            } else{
                return res.json({success: false, msg: "Contraseña Incorrecta"});
            }
        });
    });
});

router.get('/perfil', passport.authenticate('jwt',{session: false}),(req,res,next) =>{
        res.json({usuario: req.user})
});



module.exports = router;