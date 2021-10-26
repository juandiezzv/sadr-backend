const mongoose = require('mongoose');
const {Schema} = mongoose; 

const ClienteSchema =  new Schema({
    dni: { type: String, required: true},
    nombre: { type: String, required: true },  
    apellido: {type: String, required: true }, 
    telefono: {type: String},
    tipo_cliente: {type: String}, //TIPO DE CLIENTE 
    correo: {type: String},
    atenciones: [String],
    direccion: {
        ciudad: {type: String},
        distrito: {type: String},
        calle: {type: String},
        numero: {type: String}
    }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
