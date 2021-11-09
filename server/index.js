//Librerias para el login
const passport = require('passport')

//Librerias para que funcione Express y Mongodb
const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const app = express();
const { mongoose } = require('./config/database')
const path = require('path');



// Setting 
app.set('port', process.env.PORT || 3000);
// Middleware
app.use(morgan('dev'));


//para poder usar los req.body
app.use(express.json());


app.use(cors());


// Configurar cabeceras y cors
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });


//Midleware para Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


//Set Static Folder
app.use(express.static(path.join(__dirname,'../public')));

// app.use('*', (req,res) =>{
//     // res.sendFile(path.join(__dirname,'../public/index.html'))
// });


//Routes
app.use('/api/clientes',require('./routes/cliente.routes'));
app.use('/api/servicios',require('./routes/servicio.routes'));
app.use('/usuarios',require('./routes/usuario.routes'));
app.use('/api/atenciones',require('./routes/atencion.routes'));




//Starting the Server 
app.listen( app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});