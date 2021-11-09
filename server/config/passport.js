const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Usuario = require('../models/usuario');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = "BD3";
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        Usuario.get_UsuarioById(jwt_payload._id, (err, usuario)=>{
            console.log(jwt_payload);
            if(err){
                return done(err,false);
            }
            if(usuario){
                return done(null, usuario);
            } else{
                return done(null, false);
            }
        });
    }));
}
