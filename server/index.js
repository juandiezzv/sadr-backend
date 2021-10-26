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

//Midleware para Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Set Static Folder
app.use(express.static(path.join(__dirname,'../public')));

//Routes
app.use('/api/clientes',require('./routes/cliente.routes'));
app.use('/api/servicios',require('./routes/servicio.routes'));
app.use('/api/atenciones',require('./routes/atencion.routes'));


//Starting the Server 
app.listen( app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});